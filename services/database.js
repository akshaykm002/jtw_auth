const { Sequelize } = require('sequelize');
const User = require('../models/user.models.js')

const sequelize = new Sequelize("postgres://cbcbfqdf:O7b3tPnIDwBl9GrW6GUNTd74lbPQWT3Q@abul.db.elephantsql.com/cbcbfqdf", {
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true,
    },
});
console.log(sequelize?true:false);
const syncModels = async () => {
    try {
        await User.sync({alter:true}); 
        console.log('Models synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};

syncModels();

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.',sequelize?true:false);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectToDatabase();

module.exports = { sequelize, syncModels };
