'use strict';

var path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/about', require('./api/about'));
    app.use('/api/product', require('./api/product'));
    app.use('/api/picturesupload', require('./api/picturesupload'));
    app.use('/api/news', require('./api/news'));
    app.use('/api/case', require('./api/case'));

    
};