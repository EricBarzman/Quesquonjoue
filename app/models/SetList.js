const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class SetList extends Model {}

SetList.init({
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    place: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: true,
    updated_at: true
}, {
    sequelize,
    tableName: "setlists"
});

module.exports = SetList;