var path = require('path'),
	multer = require('multer')

var houses = require('../app/controllers/houses'),
	config = require('./config');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'images/')
	},
	filename: function(req, file, callback) {
		console.log(file)
		callback(null, file.originalname)
	}
})

var upload = multer({dest: 'images/'});

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.render('main.ejs');
	});

	app.get('/abc', function (req, res) {
		res.render('menu.ejs');
	});

	app.get('/list', houses.findAll );

	app.get('/edit/:id', houses.editByID );

	app.get('/delete/:id', houses.deleteByID );

	app.get('/form', function (req, res) {
		res.render('form.ejs');
	});

	app.get('/houses/:id', houses.findByID );

	app.post('/form', upload.any(), function(req, res) {
		var upload = multer({
			storage: storage
		}).single('userFile');

		console.log(req.files[0].path, req.files[0].originalname)

		upload(req, res, function(err) {
			res.end('File is uploaded');
		})
	});

	app.get('/images/:id', function(req, res) {
		res.send(id)
	})

}