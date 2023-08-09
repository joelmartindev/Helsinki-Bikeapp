const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const db = require("../utils/dbConfig");
const { Journey } = require("../models/Journey");

const pageSize = 10;

// Get a page
router.get("/", (req, res) => {
  const offset = pageSize * req.query.page - pageSize;
  const search = req.query.search;

  let searchCondition = {};

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
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get all journeys related to an id (data for statistics in single station view)
router.get("/related", (req, res) => {
  const id = req.query.id;

  let searchCondition = {
    [Op.or]: [
      { departure_station_id: { [Op.eq]: id } },
      { return_station_id: { [Op.eq]: id } },
    ],
  };

  Journey.findAll({
    attributes: [
      "departure",
      "return",
      "departure_station_id",
      "departure_station_name",
      "return_station_id",
      "return_station_name",
      "covered_distance",
    ],
    where: searchCondition,
  })
    .then((journeys) => {
      console.log(journeys);
      res.status(200).json(journeys);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get total number of pages with default options
router.get("/totalPages", (req, res) => {
  Journey.count()
    .then((countedJourneys) => {
      let totalPages = countedJourneys / pageSize;
      totalPages = Math.ceil(totalPages);
      res.status(200).json({ totalPages });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get total number of available pages with given options
router.get("/availablePages", (req, res) => {
  const search = req.query.search;

  searchCondition = {
    [Op.or]: [
      // Case insensitive search based on station names, can be departure or return station
      { departure_station_name: { [Op.iLike]: `%${search}%` } },
      { return_station_name: { [Op.iLike]: `%${search}%` } },
    ],
  };

  Journey.count({
    where: searchCondition,
  })
    .then((countedJourneys) => {
      let totalPages = countedJourneys / pageSize;
      totalPages = Math.ceil(totalPages);
      res.status(200).json({ totalPages });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get averages of all journeys
router.get("/statsAverages", (req, res) => {
  Journey.findAll({
    attributes: [
      [
        Sequelize.fn("AVG", Sequelize.col("covered_distance")),
        "averageDistance",
      ],
      [Sequelize.fn("AVG", Sequelize.col("duration")), "averageTime"],
    ],
  })
    .then((data) => {
      const averageJourneyDistance = Math.round(
        data[0].dataValues.averageDistance
      );
      const averageJourneyTime = Math.round(data[0].dataValues.averageTime);
      res.status(200).json({ averageJourneyDistance, averageJourneyTime });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get top 5 lists for statistics view
router.get("/statsLists", async (req, res) => {
  try {
    // List of longest journeys made
    const longestJourneys = await Journey.findAll({
      attributes: [
        "id",
        "departure_station_name",
        "return_station_name",
        "covered_distance",
      ],
      order: [["covered_distance", "DESC"]],
      limit: 5,
    });

    // List of most popular/frequent journeys from station A to station B
    // Group journeys by departure and return id and name, then count them
    const mostPopularJourneys = await Journey.findAll({
      attributes: [
        "departure_station_id",
        "departure_station_name",
        "return_station_id",
        "return_station_name",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [
        "departure_station_id",
        "departure_station_name",
        "return_station_id",
        "return_station_name",
      ],
      order: [[Sequelize.fn("COUNT", Sequelize.col("id")), "DESC"]],
      limit: 5,
    });

    // Departures

    const mostPopularStationsForDepartures = await Journey.findAll({
      attributes: [
        "departure_station_id",
        "departure_station_name",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["departure_station_id", "departure_station_name"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("id")), "DESC"]],
      limit: 5,
    });

    const leastPopularStationsForDepartures = await Journey.findAll({
      attributes: [
        "departure_station_id",
        "departure_station_name",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["departure_station_id", "departure_station_name"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("id")), "ASC"]],
      limit: 5,
    });

    // Returns

    const mostPopularStationsForReturns = await Journey.findAll({
      attributes: [
        "return_station_id",
        "return_station_name",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["return_station_id", "return_station_name"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("id")), "DESC"]],
      limit: 5,
    });

    const leastPopularStationsForReturns = await Journey.findAll({
      attributes: [
        "return_station_id",
        "return_station_name",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["return_station_id", "return_station_name"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("id")), "ASC"]],
      limit: 5,
    });

    res.status(200).json({
      longestJourneys,
      mostPopularJourneys,
      mostPopularStationsForDepartures,
      leastPopularStationsForDepartures,
      mostPopularStationsForReturns,
      leastPopularStationsForReturns,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get weeks with counts of all journeys in the week
router.get("/statsJourneysPerWeek", (req, res) => {
  Journey.findAll({
    attributes: [
      [Sequelize.literal("EXTRACT(WEEK FROM departure)"), "week"],
      [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
    ],
    group: ["week"],
  })
    .then((weekcounts) => {
      console.log(weekcounts);
      res.status(200).json(weekcounts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

// Get a single journey
router.get("/:id", (req, res) => {
  Journey.findByPk(req.params.id)
    .then((journey) => {
      console.log(journey);
      res.status(200).json(journey);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
