'use strict';

var _ = require('lodash');
var ProductModel = require('./product.model');
var squel = require("squel");

var mysql      = require('mysql');
var dbconfig = require('../../db/config');
var db = require('../../db');

// Get list of things
exports.index = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }
    var s = squel.select().from("products").order("id");
    db.query(s.toString(),func);
};

// Get a single thing
exports.show = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }
    var s = squel.select().from("products").where("id = " + req.params.target);
    db.query(s.toString(),func);
};

exports.create = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }
    var post = req.body;
    if(post.id !== undefined){
        post.id = parseInt(post.id);
    }

    var s = squel.insert().into("products").setFields(post);
    db.query(s.toString(),func);
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }
    var post = req.body;

    var s = squel.update().table("products").setFields(post).where("id = " + req.params.target);
    db.query(s.toString(),func);
};

// Updates an existing thing in the DB.
exports.destroy = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }

    var s = "delete from products where id = " + req.params.id;
    db.query(s.toString(),func);
};