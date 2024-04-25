const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('queskonjoue', 'root', 'strato68', {
    dialect: "mysql",
    define : {
        underscored: true,
        scopes: {
            excludeCreatedAtUpdateAt: {
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        },
        timestamps: false 
    }
    
});

module.exports = sequelize;