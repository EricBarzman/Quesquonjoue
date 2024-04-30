const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client')

const User = sequelize.define(
    'users',
    {
        pk: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: DataTypes.UUIDV4,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar_path: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, 
    { timestamps: false }
);

module.exports = User;