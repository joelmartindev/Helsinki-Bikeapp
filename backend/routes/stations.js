const express = require('express')
const router = express.Router()
const db = require('../utils/dbConfig')
const Station = require('../models/Station')

router.get('/', (req, res) => {
    Station.findAll({ limit: 10 })
        .then(stations => {
            console.log(stations)
            res.status(200).json(stations)
        })
        .catch(err => console.log(err))
})

router.get(('/:id'), (req, res) => {
    Station.findByPk(req.params.id)
        .then(station => {
            console.log(station)
            res.status(200).json(station)
        })
        .catch(err => console.log(err))
})

module.exports = router