const { DataTypes } = require('sequelize');
// const { sequelize } = require('../services/database.js');
const { Sequelize } = require('sequelize');


// Check if sequelize is properly imported
// console.log(sequelize?true:false);
const sequelize = new Sequelize("postgres://cbcbfqdf:O7b3tPnIDwBl9GrW6GUNTd74lbPQWT3Q@abul.db.elephantsql.com/cbcbfqdf", {
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true,
    },
});

if (sequelize) {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    async function syncModels() {
        try {
            await User.sync({ alter: true });
            console.log('Models synchronized ');
        } catch (error) {
            console.error('Error synchronizing model:', error);
        }
    }

    syncModels();

    module.exports = User;
} else {
    console.error('Sequelize is undefined. Check the import statement or database initialization.');
}
