const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	title: String,
	description: String,
	images: [String],
	address: String,
	perks: [String],
	extraInfo: String,
	checkIn: Number,
	checkOut: Number,
	maxGuests: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
