/**
 * Created by I302636 on 5/5/2016.
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('rentest', 'root', 'Sybase123', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;