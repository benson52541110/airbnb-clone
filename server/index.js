const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "alsdkasdkopqwnelqnwleknqwe";
const bucket = "2023-airbnb-image";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

async function uploadToS3(path, originalFilename, mimetype) {
	try {
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
				// ACL: "public-read", // 可根据需要取消注释
			})
		);

		return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
	} catch (err) {
		console.error("Error uploading to S3:", err);
		throw new Error("Error uploading to S3");
	}
}

function getUserDataFromReq(req) {
	return new Promise((resolve, reject) => {
		jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
			if (err) {
				reject(err);
			} else {
				resolve(userData);
			}
		});
	});
}

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/api/test", (req, res) => {
	res.json("test ok");
});

app.post("/api/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const userDoc = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
			favorites: [],
		});
		res.json(userDoc);
	} catch (e) {
		res.status(422).json(e);
	}
});

app.post("/api/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const userDoc = await User.findOne({ email });
		if (userDoc) {
			const passOk = bcrypt.compareSync(password, userDoc.password);
			if (passOk) {
				jwt.sign(
					{
						email: userDoc.email,
						id: userDoc._id,
						name: userDoc.name,
					},
					jwtSecret,
					{},
					(err, token) => {
						if (err) {
							res.status(500).json({ error: "Error generating token" });
						} else {
							res.cookie("token", token).json(userDoc);
						}
					}
				);
			} else {
				res.status(422).json("pass not ok");
			}
		} else {
			res.status(404).json("not found");
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.put("/api/favorites", async (req, res) => {
	try {
		const { email, favorites } = req.body;
		const userDoc = await User.findOne({ email });
		if (!userDoc) {
			return res.status(404).json({ error: "User not found" });
		}
		userDoc.favorites = favorites;
		await userDoc.save();
		res.json(userDoc);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/api/profile", async (req, res) => {
	const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const userData = await jwt.verify(token, jwtSecret);
		const { name, email, _id } = await User.findById(userData.id);
		res.json({ name, email, _id });
	} catch (err) {
		res.status(500).json({ error: "JWT verification failed" });
	}
});

app.post("/api/logout", (req, res) => {
	res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
	const { link } = req.body;
	try {
		const fileType = mime.lookup(link);
		if (
			!fileType ||
			!["image/jpeg", "image/png", "image/webp"].includes(fileType)
		) {
			return res.status(400).json({ error: "Invalid file type" });
		}

		const extension = mime.extension(fileType);
		const newName = "photo" + Date.now() + "." + extension;

		await imageDownloader.image({
			url: link,
			dest: "/tmp/" + newName,
		});

		const url = await uploadToS3("/tmp/" + newName, newName, fileType);

		res.json(url);
	} catch (err) {
		res.status(500).json({ error: "File download or upload failed" });
	}
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post(
	"/api/upload",
	photosMiddleware.array("photos", 100),
	async (req, res) => {
		try {
			const uploadedFiles = [];
			for (let i = 0; i < req.files.length; i++) {
				const { path, originalname, mimetype } = req.files[i];
				const url = await uploadToS3(path, originalname, mimetype);
				uploadedFiles.push(url);
			}
			res.json(uploadedFiles);
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error during file upload: " + err.message });
		}
	}
);

app.get("/api/user-places", async (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(401).json({ error: "JWT must be provided" });
	}

	try {
		const userData = await new Promise((resolve, reject) => {
			jwt.verify(token, jwtSecret, {}, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const places = await Place.find({ owner: userData.id });
		res.json(places);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/api/places/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const place = await Place.findById(id);
		if (!place) {
			return res.status(404).json({ error: "Place not found" });
		}
		res.json(place);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/api/places", async (req, res) => {
	try {
		const places = await Place.find();
		res.json(places);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post("/api/places", async (req, res) => {
	const { token } = req.cookies;
	const {
		title,
		address,
		photos,
		description,
		price,
		listSelection,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		roomType,
		roomRange,
		roomCategory,
		bed,
		room,
		bedroom,
		landlord,
	} = req.body;

	try {
		const userData = await new Promise((resolve, reject) => {
			jwt.verify(token, jwtSecret, {}, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const placeDoc = await Place.create({
			owner: userData.id,
			price,
			title,
			address,
			photos,
			description,
			listSelection,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			roomType,
			roomRange,
			roomCategory,
			bed,
			room,
			bedroom,
			landlord: userData.name,
		});
		res.json(placeDoc);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.put("/api/places", async (req, res) => {
	const { token } = req.cookies;
	const {
		id,
		title,
		address,
		photos,
		description,
		listSelection,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
		roomType,
		roomRange,
		roomCategory,
		bed,
		room,
		bedroom,
		landlord,
	} = req.body;

	try {
		const userData = await new Promise((resolve, reject) => {
			jwt.verify(token, jwtSecret, {}, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const placeDoc = await Place.findById(id);
		if (!placeDoc) {
			return res.status(404).json({ error: "Place not found" });
		}

		if (userData.id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				photos,
				description,
				listSelection,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
				roomType,
				roomRange,
				roomCategory,
				bed,
				room,
				bedroom,
				landlord,
			});
			await placeDoc.save();
			res.json("ok");
		} else {
			res.status(403).json({ error: "Unauthorized to edit this place" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.delete("/api/places/:id", async (req, res) => {
	const { id } = req.params;
	const { token } = req.cookies;

	try {
		const userData = await new Promise((resolve, reject) => {
			jwt.verify(token, jwtSecret, {}, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const placeDoc = await Place.findById(id);
		if (!placeDoc) {
			return res.status(404).json({ error: "Place not found" });
		}

		if (userData.id === placeDoc.owner.toString()) {
			await Place.deleteOne({ _id: id });
			res.json({ message: "Place deleted successfully" });
		} else {
			res.status(403).json({ error: "Unauthorized to delete this place" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/api/bookings", async (req, res) => {
	try {
		const userData = await getUserDataFromReq(req);
		const bookings = await Booking.find({ user: userData.id }).populate(
			"place"
		);
		res.json(bookings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post("/api/bookings", async (req, res) => {
	try {
		const userData = await getUserDataFromReq(req);
		const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
			req.body;

		const bookingDoc = await Booking.create({
			place,
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			price,
			user: userData.id,
		});
		res.json(bookingDoc);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.delete("/api/bookings/:bookingId", async (req, res) => {
	try {
		const userData = await getUserDataFromReq(req);

		const { bookingId } = req.params;

		const booking = await Booking.findOne({
			_id: bookingId,
			user: userData.id,
		});
		if (!booking) {
			return res.status(404).json({ message: "預訂不存在或不屬於該用戶。" });
		}

		await Booking.deleteOne({ _id: bookingId });
		res.json({ message: "預訂已成功刪除。" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.listen({ port: process.env.PORT || 4000 }, () => {
	console.log("Server started");
});
