const { Sequelize } = require('sequelize')
const db = require('../utils/dbConfig')

const Station = db.define('station', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
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
    tableName: 'stations',
    timestamps: false
})

//Note: Model.associate is not a part of Sequelize, but an example of theirs used a function like this
//Associations such as hasMany could also be done somewhere else if one doesn't want to define the associations in this file
Station.associate = models => {
    Station.hasMany(models.Journey, { as: 'departures', foreignKey: 'departure_station_id' })
    Station.hasMany(models.Journey, { as: 'returns', foreignKey: 'return_station_id' })
}

module.exports = { Station }