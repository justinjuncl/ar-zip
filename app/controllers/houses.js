var mongoose = require('mongoose'),
	House = mongoose.model('House');

module.exports = {

	findAll: function (req, res) {

		var houses = [
			{image: "pano1", desc: "아트리움", price: "1000/40", _id: "pano1", location: "안암역"},
			{image: "pano2", desc: "피아노 방", price: "1000/35", _id: "pano2", location: "안암역"},
			{image: "pano3", desc: "pano3", price: "1000/40", _id: "pano3", location: "안암역"},
		];

		res.render('list', {
			layout: false,
			houses: houses
		});

		// House.find(function (err, houses) {

		// });

	},

	findHouseByID: function (req, res) {

		var house1 = {image: "pano1", desc: "아트리움", price: "1000/40", _id: "pano1", location: "안암역", area: "240m²", extra: "자판기", phone: "010-1234-5678"};
		var house2 = {image: "pano2", desc: "피아노 방", price: "1000/35", _id: "pano2", location: "안암역", area: "200m²", extra: "피아노", phone: "010-1234-5678"};

		var house

		if (req.params.id == "pano1") {
			house = house1
		} else if (req.params.id == "pano2") {
			house = house2
		}

		res.render('house', {
			layout: false,
			house: house
		});

		// House.findById(req.params.id, function (err, house) {
		// 	res.render('house', {
		// 		layout: false,
		// 		house: house
		// 	});
		// });

	},

	editHouseByID: function (req, res) {

		House.findById(req.params.id, function (err, house) {
			res.render('form', {
				layout: false,
				house: house
			});
		});

	},

	createHouse: function (req, res) {

		if ( req.body._id ) {
			var data = {
				user: req.body.user,
				date: req.body.date,
				image: req.body.image,
				roomCount: req.body.roomCount,
				area: req.body.area,
				phone: req.body.phone,
				price: req.body.price,
				deposit: req.body.deposit,
				desc: req.body.desc,
				location: req.body.location,
				metroLine: req.body.metroLine,
				metroStation: req.body.metroStation,
				extra: req.body.extra,
				payment: req.body.payment,
			};

			House.update({ _id: req.body._id}, { $set: data }, function(a, b) {});

		} else {
			var newHouse = new House({
				user: req.body.user,
				date: req.body.date,
				image: req.body.image,
				roomCount: req.body.roomCount,
				area: req.body.area,
				phone: req.body.phone,
				price: req.body.price,
				deposit: req.body.deposit,
				desc: req.body.desc,
				location: req.body.location,
				metroLine: req.body.metroLine,
				metroStation: req.body.metroStation,
				extra: req.body.extra,
				payment: req.body.payment,
			});

			newHouse.save();
		}

		res.send({redirect: '/'})

	},

	deleteHouseByID: function (req, res) {
		House.findByIdAndRemove(req.params.id, function (err, house) {
			res.send({redirect: "/"});
		});
	}

}