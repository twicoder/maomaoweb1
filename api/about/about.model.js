'use strict';

var mysql      = require('mysql');
var dbconfig = require('../../db/config');


module.exports = {
    getaboutus : function(func){
        var connection = mysql.createConnection(dbconfig);
        connection.connect();
        var sql = "select content from aboutus where name='about'";
        connection.query(sql,function(err,rows){
            if(err) throw err;
            func(rows[0]);
            connection.end();
        })
    },
    findById:function(targetName,cb){
        var connection = mysql.createConnection(dbconfig);
        connection.connect();
        var sql = "select * from about where name='"+targetName+"'";
        connection.query(sql,function(err,rows){
            if(err) throw err;
            cb(err,rows[0]);
            connection.end();
        })

    },

    update:function(updatedTarget,cb){
        var connection = mysql.createConnection(dbconfig);
        connection.connect();
        //var sql = "update about set content ='"+updatedTarget.content+"' where name='"+updatedTarget.name+"'";
        var sql = "update ?? set ?? = ? where ?? = ?"
        // var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['about', 'content',updatedTarget.content,'name', updatedTarget.name];
        sql = mysql.format(sql, inserts);
        //console.log("########:"+sql);
        connection.query(sql,function(err,rows){
            if(err) throw err;
            cb(err,rows[0]);
            connection.end();
        })
    }

}