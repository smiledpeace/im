var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var moment = require('moment');


var now = moment().format('YYYY_MM_DD');

/* GET users listing. */
router.post('/registe', function(req, res, next) {
	if (req.body.nickname && req.body.password) {
		req.session.user = {
			nickname: req.body.nickname,
			password: req.body.password,
			user_id: Date.now() + 123,
			created: Date.now(),
			avatar: req.body.avatar
		}
		res.send({result: 'TRUE'});
	}else {
  		res.send({result: 'FALSE'});
	}
});


router.post('/gs', function(req, res, next) {
	if (req.session.user) {
		res.send({result: 'TRUE', data: req.session.user});
	}else {
		res.send({result: 'FALSE'});
	}
});

router.post('/upload', function(req, res, next) {
	var chunks = [];
	var form = new multiparty.Form();
   	form.parse(req, function (err, fields, files) {
       	console.log(fields);
       	console.log(files);

       	fs.readFile(files.files[0].path, function(err, originBuffer) {

		    var base64Img = originBuffer.toString('base64');  // base64图片编码字符串
		    var decodeImg = new Buffer(base64Img, 'base64');  // new Buffer(string, encoding)
		    // 生成图片3(把base64位图片编码写入到图片文件)
		    fs.writeFile('public/images/upload/' + now + fields.fileName, decodeImg, function(err) {
		        if(err) {
		        	console.log(err)
		        	res.send({result: 'FALSE'});
		        	return;
		        }
		        res.send({result: 'TRUE', url: '/images/upload/' + now + fields.fileName})
		    });
		});
    });



});

module.exports = router;
