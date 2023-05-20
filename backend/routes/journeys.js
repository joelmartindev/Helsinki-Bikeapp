const express = require('express')
const router = express.Router()
const db = require('../utils/dbConfig')
const { Journey } = require('../models/Journey')

router.get('/', (req, res) => {
    Journey.findAll({ limit: 10, order: db.col('id')})
        .then(stations => {
            console.log(stations)
            res.status(200).json(stations)
        })
        .catch(err => console.log(err))
})

module.exports = router