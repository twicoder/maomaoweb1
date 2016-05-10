'use strict';

var mysql      = require('mysql');
var dbconfig = require('./config');



module.exports = {
    query : function(sql,func){
        var connection = mysql.createConnection(dbconfig);
        connection.connect();
        connection.query(sql,function(err,rows){
            if(err) throw err;
            func(rows);
            connection.end();
        })
    }
}
