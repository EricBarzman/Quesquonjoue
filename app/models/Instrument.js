const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class Instrument extends Model {}

Instrument.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    tableName: "instruments"
})

module.exports = Instrument;