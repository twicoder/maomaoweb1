'use strict';

var _ = require('lodash');
var AboutModel = require('./about.model');
var squel = require("squel");

var mysql      = require('mysql');
var dbconfig = require('../../db/config');
var db = require('../../db');

// Get list of things
exports.index = function(req, res) {
    return res.status(200).jsonp([]);
};

exports.show = function(req, res) {
    var targetName=req.params.target;
    AboutModel.findById(targetName, function (err, target) {
        if(err) { return handleError(res, err); }
        if(!target) { return res.status(404).send('Not Found'); }
        return res.json(target);
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    var func = function(data){
        res.status(200).jsonp(data);
    }
    var post = req.body;
    console.log(post.id);

    var s = squel.update().table("about").setFields(post).where("id="+post.id);
    console.log(s.toString());
    db.query(s.toString(),func);
};

// exports.update = function(req, res) {
//     console.log(req.body);
//     AboutModel.findById(req.params.target, function (err, target) {
//         if (err) { return handleError(res, err); }
//         if(!target) { return res.status(404).send('Not Found'); }
//         var updated = _.merge(target, req.body);
//         console.log(updated);
//         // updated.save(function (err) {
//         //     if (err) { return handleError(res, err); }
//         //     return res.status(200).json(target);
//         // });
//         AboutModel.update(updated,function(err,target){
//             if(err){
//                 return res.status(404).send('Update Failed');
//             }
//             console.log('##########################');
//             console.log(target);
//             console.log('##########################');
//             return res.status(200).json(target);
//         })
//
//     });
// };