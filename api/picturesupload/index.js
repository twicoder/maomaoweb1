var express = require('express');
var router = express.Router();
//var multiparty = require('connect-multiparty');
// var multipartyMiddleware = multiparty();
var formidable = require('formidable');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/uploads', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/../../public/upload/productsPictures/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.on('error', function(err) {
        console.log('Error happened:'+err);
    });

    form.on('aborted', function() {
        console.log("About event triggered!");
    });
    

});

module.exports = router;
