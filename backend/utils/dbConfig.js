const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

module.exports = new Sequelize('bikeapp', process.env.DB_USER, process.env.DB_PASS, { //server, user, pass
    host: 'localhost',
    dialect: 'postgres',
    define: {
        schema: 'bikeapp'
    }
})