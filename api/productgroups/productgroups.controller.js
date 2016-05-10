'use strict';

var _ = require('lodash');
var AboutModel = require('./about.model');


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

exports.update = function(req, res) {
    console.log(req.body);
    AboutModel.findById(req.params.target, function (err, target) {
        if (err) { return handleError(res, err); }
        if(!target) { return res.status(404).send('Not Found'); }
        var updated = _.merge(target, req.body);
        console.log(updated);
        // updated.save(function (err) {
        //     if (err) { return handleError(res, err); }
        //     return res.status(200).json(target);
        // });
        AboutModel.update(updated,function(err,target){
            if(err){
                return res.status(404).send('Update Failed');
            }
            console.log('##########################');
            console.log(target);
            console.log('##########################');
            return res.status(200).json(target);
        })

    });
};