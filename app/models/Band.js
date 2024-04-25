const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client')

const Band = sequelize.define(
    'bands',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

module.exports = Band;