const express = require("express");
const router = express.Router();
const db = require("../utils/dbConfig");
const { Journey } = require("../models/Journey");

const pageSize = 10;

// Get a page
router.get("/", (req, res) => {
  const offset = pageSize * req.query.page - pageSize;

  Journey.findAll({
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
