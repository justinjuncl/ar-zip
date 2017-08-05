var mongoose = require('mongoose');

var HouseSchema = new mongoose.Schema({
	user	: String,
	date	: String,
	image	: String,
	roomCount:Number,
	area	: String,
	phone	: String,
	price	: String,
	deposit : String,
	desc	: String,
	location: String,
	metro	: String,
	payment : String,
	extra	: String
}, { collection: 'houses' });

mongoose.model('House', HouseSchema);