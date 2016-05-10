'use strict';

var sequelize = require('../../db/SequelizeInstance');
var Sequelize = require('sequelize');

var ProductModel = sequelize.define('cases', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category:Sequelize.STRING,
  categoryPictureUrl:Sequelize.STRING,
  content:Sequelize.TEXT
});

module.exports = ProductModel;

