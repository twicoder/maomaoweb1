var express = require('express');
var router = express.Router();
var formidable = require('formidable');


router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = __dirname + '/../public/upload';

  form.parse(req, function (err, fields, files) {
    if (err) {
      throw err;
    }

    var image = files.imgFile;
    var path = image.path;
    var reg=/\\|\//g;
    path = path.replace(/\\|\//g, '/');
    var url = '/upload' + path.substr(path.lastIndexOf('/'), path.length);
    var info = {
      "error": 0,
      "url": url
    };
    res.send(info);
  });
});

module.exports = router;

