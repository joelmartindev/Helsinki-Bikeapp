const express = require("express");
const router = express.Router();
const db = require("../utils/dbConfig");
const { Station } = require("../models/Station");
const { Journey } = require("../models/Journey");

const pageSize = 6;

router.get("/", (req, res) => {
  const offset = pageSize * req.query.page - pageSize;

  Station.findAll({ limit: pageSize, offset: offset })
    .then((stations) => {
      console.log(stations);
      res.status(200).json(stations);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Station.findByPk(req.params.id)
    .then((station) => {
      console.log(station);
      res.status(200).json(station);
    })
    .catch((err) => console.log(err));
});

router.get("/:id/journeys", async (req, res) => {
  try {
    // Count departures
    const departuresCount = await Journey.count({
      where: { departure_station_id: req.params.id },
      raw: true,
    });

    // Count returns
    const returnsCount = await Journey.count({
      where: { return_station_id: req.params.id },
      raw: true,
    });

    const result = {
      departuresCount,
      returnsCount,
    };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
