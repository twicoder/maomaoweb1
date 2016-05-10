'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  category: String,
  shortintro: String,
  detail: String
});

module.exports = mongoose.model('Thing', ThingSchema);