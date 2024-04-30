const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class Tune extends Model {}

Tune.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: true
    },
    has_solo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_tiresome: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    partition_path : {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: true,
    updated_at: true
}, {
    sequelize,
    tableName: "tunes"
});

module.exports = Tune;