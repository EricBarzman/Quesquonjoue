const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client')

const Style = sequelize.define(
    'styles',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);

module.exports = Style;