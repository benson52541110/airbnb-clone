const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");
const PlaceModel = require("./models/Place");
const imageDownloader = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const bcryptSalt = bcrypt.genSaltSync(10);
const bucket = "2023-airbnb-image";

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5174",
	})
);

async function uploadToS3(path, originalFilename, mimetype) {
	const client = new S3Client({
		region: "ap-southeast-2",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
	});
	const parts = originalFilename.split(".");
	const ext = parts[parts.length - 1];
	const newFilename = Date.now() + "." + ext;
	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Body: fs.readFileSync(path),
			Key: newFilename,
			ContentType: mimetype,
			ACL: "public-read",
		})
	);
	return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userData = await UserModel.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json(userData);
	} catch (err) {
		res.status(422).json(err);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const userData = await UserModel.findOne({ email });
	if (userData) {
		const passwordMatches = bcrypt.compareSync(password, userData.password);
		if (passwordMatches) {
			jwt.sign(
				{ email: userData.email, id: userData._id },
				process.env.JWT_SECRET,
				{ expiresIn: "1h" },
				(err, token) => {
					if (err) {
						res.status(500).json(err);
					} else {
						res.cookie("token", token, { httpOnly: true }).json(userData);
					}
				}
			);
		} else {
			res.status(401).json({ message: "Wrong password" });
		}
	} else {
		res.status(404).json({ message: "User not found" });
	}
});

app.get("/profile", (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
			if (err) {
				res.status(401).json({ message: "Invalid token" });
			} else {
				const userInfo = await UserModel.findById(userData.id);
				res.json(userInfo);
			}
		});
	}
});

app.post("/logout", (req, res) => {
	res.clearCookie("token").json({ message: "Logged out" });
});

app.post("/upload-by-link", async (req, res) => {
	const { link } = req.body;
	const newName = "photo" + Date.now() + ".jpg";
	await imageDownloader.image({
		url: link,
		dest: "/tmp/" + newName,
	});
	const url = await uploadToS3(
		"/tmp/" + newName,
		newName,
		mime.lookup("/tmp/" + newName)
	);
	res.json(url);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname, mimetype } = req.files[i];
		const url = await uploadToS3(path, originalname, mimetype);
		uploadedFiles.push(url);
	}
	res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
	mongoose.connect(process.env.MONGODB_URL);
	const { token } = req.cookies;
	console.log(req.body);
	const {
		title,
		address,
		addedPhotos,
		description,
		price,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
	} = req.body;
	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await PlaceModel.create({
			owner: userData.id,
			price,
			title,
			address,
			images: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		});
		res.json(placeDoc);
	});
});

app.listen(4001);

//m36BD05iirdV3DdS
