const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../utils/dbConfig");
const { Journey } = require("../models/Journey");

const pageSize = 10;

// Get a page
router.get("/", (req, res) => {
  const offset = pageSize * req.query.page - pageSize;
  const search = req.query.search;

  let searchCondition = {};

  console.log(search);
  if (search && search !== "null" && search !== "") {
    searchCondition = {
      [Op.or]: [
        // Case insensitive search based on station names, can be departure or return station
        { departure_station_name: { [Op.iLike]: `%${search}%` } },
        { return_station_name: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }

  Journey.findAll({
    where: searchCondition,
    limit: pageSize,
    offset: offset,
    order: db.col("departure"),
  })
    .then((journeys) => {
      console.log(journeys);
      res.status(200).json(journeys);
    })
    .catch((err) => console.log(err));
});

// Get total number of pages
router.get("/totalPages", (req, res) => {
  Journey.count()
    .then((countedJourneys) => {
      let totalPages = countedJourneys / pageSize;
      totalPages = Math.ceil(totalPages);
      res.status(200).json({ totalPages });
    })
    .catch((err) => console.log(err));
});

// Get a single journey
router.get("/:id", (req, res) => {
  Journey.findByPk(req.params.id)
    .then((journey) => {
      console.log(journey);
      res.status(200).json(journey);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
