var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
	if (!req.session.user) {
		res.redirect('/registe');
		return;
	}
  	res.render('index', { 
  		title: 'ImYoung',
  		type: '', 
  		param1: '', 
  		param2: '', 
  		param3: '', 
  		param4: '', 
  	});
});

router.get('/:type/:param1?/:param2?/:param3?/:param4?', function(req, res, next) {

  	res.render('index', { 
  		title: 'ImYoung' , 
  		type: req.params.type, 
  		param1: req.params.param1, 
  		param2: req.params.param2, 
  		param3: req.params.param3, 
  		param4: req.params.param4, 
  	});
});

module.exports = router;
