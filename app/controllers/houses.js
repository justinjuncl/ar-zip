var mongoose = require('mongoose'),
	House = mongoose.model('House');

module.exports = {

	findAll: function (req, res) {

		req.params

		House.find(function (err, houses) {
			res.render('list', {
				layout: false,
				houses: houses
			});
		});

	},

	findHouseByID: function (req, res) {

		House.findById(req.params.id, function (err, house) {
			res.render('house', {
				layout: false,
				house: house
			});
		});

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
				inst: req.body.inst,
				instType: req.body.instType,
				instNumb: req.body.instNumb,
				manufact: req.body.manufact,
				model: req.body.model,
				serial: req.body.serial,
				status: req.body.status,
				components: req.body.components,
				needsRepair: req.body.needsRepair,
				currUser: req.body.currUser,
				useDate: req.body.useDate,
				extra: req.body.extra,
				image: req.body.image ? req.body.image.replace(/ /g, '+') : '',
			};

			House.update({ _id: req.body._id}, { $set: data }, function(a, b) {});

		} else {
			var newHouse = new House({
				inst: req.body.inst,
				instType: req.body.instType,
				instNumb: req.body.instNumb,
				manufact: req.body.manufact,
				model: req.body.model,
				serial: req.body.serial,
				status: req.body.status,
				components: req.body.components,
				needsRepair: req.body.needsRepair,
				currUser: req.body.currUser,
				useDate: req.body.useDate,
				extra: req.body.extra,
				image: req.body.image ? req.body.image.replace(/ /g, '+') : '',
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