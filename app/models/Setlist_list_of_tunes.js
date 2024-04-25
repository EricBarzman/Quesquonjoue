const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

const Setlist_list_of_tunes = sequelize.define(
    'setlist_list_of_tunes',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);

module.exports = Setlist_list_of_tunes;