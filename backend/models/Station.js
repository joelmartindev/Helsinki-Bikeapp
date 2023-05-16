const { Sequelize } = require('sequelize')
const db = require('../utils/dbConfig')

const Station = db.define('station', {
    name_fi: {
        type: Sequelize.STRING
    },
    name_se: {
        type: Sequelize.STRING
    },
    name_en: {
        type: Sequelize.STRING
    },
    address_fi: {
        type: Sequelize.STRING
    },
    address_se: {
        type: Sequelize.STRING
    },
    city_fi: {
        type: Sequelize.STRING
    },
    city_se: {
        type: Sequelize.STRING
    },
    operator: {
        type: Sequelize.STRING
    },
    capacity: {
        type: Sequelize.STRING
    },
    coord_x: {
        type: Sequelize.STRING
    },
    coord_y: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

module.exports = Station