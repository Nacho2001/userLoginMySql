const {Sequelize} = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    // Base de datos
    process.env.dbDatabase,
    // Username
    process.env.dbUser,
    // Password
    process.env.dbPassword,
    {
        // Ubicacion de la base de datos
        host: `${process.env.dbIP}:${process.env.dbPort}`,
        // Motor de DB
        dialect: process.env.dialect
    }
)

module.exports = sequelize