/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

/////////////////////////////

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates,res) {
  return function(entity) {
    return entity.updateAttributes(updates)
            .then(function(updated){
              return updated;
            });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
              .then(function(){
                res.status(204).end();
              });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

///////////////////////////////


// Get list of things
exports.index = function(req, res) {
  Thing.findAll().then(function(results){
    return res.status(200).jsonp(results);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.find({
        where: {
          _id: req.params.id
        }
      })
      .then(function(oneResult){
        if(oneResult!=null){
          return res.status(200).jsonp(oneResult);
        }else{
          return res.status(200).jsonp({});
        }
      });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  // Thing.create(req.body).then(function(createdRecord){
  //   return res.status(201).json(createdRecord);
  // })
    Thing.sync({force:false}).then(function(){
        Thing.create(req.body).then(function(createdRecord){
            return res.status(201).json(createdRecord);
        })
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.find({
        where: {
          _id: req.params.id
        }
      })
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      // .then(respondWithResult(res))
      .catch(handleError(res));
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.find({
        where: {
          _id: req.params.id
        }
      })
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res));
};

function handleError(res, err) {
  return res.status(500).send(err);
}