'use strict';

var sequelize = require('../../db/SequelizeInstance');
var Sequelize = require('sequelize');

var ProductModel = sequelize.define('products', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  category:Sequelize.STRING,
  productPictureUrl:Sequelize.STRING,
  productIntro:Sequelize.TEXT,
  detail:Sequelize.TEXT
});

module.exports = ProductModel;

