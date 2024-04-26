const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client')

const Mood = sequelize.define(
    'moods',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);

module.exports = Mood;