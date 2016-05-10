'use strict';

var sequelize = require('../../db/SequelizeInstance');
var Sequelize = require('sequelize');

var newsModel = sequelize.define('news', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  shortIntro: Sequelize.TEXT,
  newsPictureUrl:Sequelize.STRING,
  content:Sequelize.TEXT,
});

module.exports = newsModel;

