var path = require('path'),
	multer = require('multer')

var houses = require('../app/controllers/houses'),
	config = require('./config');

var fs = require('fs');

var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'images/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.render('main.ejs');
	});

	app.post('/list', houses.findAll );

	app.get('/edit/:id', houses.editHouseByID );

	app.get('/delete/:id', houses.deleteHouseByID );

	app.get('/form', function (req, res) {
		res.render('form.ejs');
	});

	app.get('/houses/:id', houses.findHouseByID );

	app.get('/images/:image', function(req, res) {

		var fileStream = fs.createReadStream('images/'+req.params.image+'.jpg');
		fileStream.pipe(res);

	});

	app.get('/arview/:image', function(req, res) {

		res.render('arview.ejs', {
			image: req.params.image
		});

	})

	app.get('/lots', function(req, res) {
		res.render('view.ejs');
	})

	app.post('/form', upload.any(), function(req, res) {

		 res.send(req.files);

		 console.log(req)
 
		 var path = req.files[0].path;
		 var imageName = req.files[0].originalname;
		 
		 var imagepath = {};
		 imagepath['path'] = path;
		 imagepath['originalname'] = imageName;

 		console.log(imagepath)

	});

}