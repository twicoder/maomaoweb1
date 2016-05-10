'use strict';

var sequelize = require('../../db/SequelizeInstance');
var Sequelize = require('sequelize');

var AboutModel = sequelize.define('aboutus', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  content:Sequelize.TEXT
});

module.exports = AboutModel;

