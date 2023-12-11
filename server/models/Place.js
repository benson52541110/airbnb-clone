const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: String,
	address: String,
	photos: [String],
	description: String,
	listSelection: [String],
	extraInfo: String,
	checkIn: Number,
	checkOut: Number,
	maxGuests: Number,
	price: Number,
	roomType: String,
	roomRange: String,
	roomCategory: String,
	bed: Number,
	room: Number,
	bedroom: Number,
	landlord: String,
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
