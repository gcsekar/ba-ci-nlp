var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//	res.render('index', {
//		title : 'Express'
//	});
	res.status(200).send('Running!')
});

//function anyBodyParser(req, res, next) {
//	var data = '';
//	req.setEncoding('utf8');
//	req.on('data', function(chunk) {
//		data += chunk;
//	});
//	req.on('end', function() {
//		req.rawBody = data;
//		next();
//	});
//}
//app.configure(function() {
//	app.use(anyBodyParser);
//});

module.exports = router;