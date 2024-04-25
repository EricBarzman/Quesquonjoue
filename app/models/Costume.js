const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client')

const Costume = sequelize.define(
    'costumes',
    {
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

module.exports = Costume;