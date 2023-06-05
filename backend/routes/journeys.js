const express = require("express");
const router = express.Router();
const db = require("../utils/dbConfig");
const { Journey } = require("../models/Journey");

const pageSize = 10;

router.get("/", (req, res) => {
  const offset = pageSize * req.query.page - pageSize;

  Journey.findAll({
    limit: pageSize,
    offset: offset,
    order: db.col("departure"),
  })
    .then((stations) => {
      console.log(stations);
      res.status(200).json(stations);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
