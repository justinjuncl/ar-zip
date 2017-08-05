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

	app.get('/list', houses.findAll );

	app.get('/edit/:id', houses.editHouseByID );

	app.get('/delete/:id', houses.deleteHouseByID );

	app.get('/form', function (req, res) {
		res.render('form.ejs');
	});

	app.get('/houses/:id', houses.findHouseByID );

	app.get('/images/:id', function(req, res) {

		var fileStream = fs.createReadStream('images/'+req.params.id+'.jpg');
		fileStream.pipe(res);


	})

	app.get('/arview/:id', function(req, res) {

		var house = {image: req.params.id}

		res.render('arview.ejs', {
				house: house
			});

	})

	app.post('/form', upload.any(), function(req, res) {

		 res.send(req.files);
 
/*req.files has the information regarding the file you are uploading...
from the total information, i am just using the path and the imageName to store in the mongo collection(table)
*/
 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;

 		console.log(imagepath)

	});

	app.get('/images/:id', function(req, res) {
		res.send(id)
	})

}