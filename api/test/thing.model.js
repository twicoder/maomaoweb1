'use strict';

var sequelize = require('../../db/SequelizeInstance');
var Sequelize = require('sequelize');

var ThingModel = sequelize.define('Thing', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

module.exports = ThingModel;

