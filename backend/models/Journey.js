const { Sequelize } = require("Sequelize");
const db = require("../utils/dbConfig");
const { Station } = require("./Station");

const Journey = db.define(
  "journey",
  {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    departure: {
      type: Sequelize.DATE,
    },
    return: {
      type: Sequelize.DATE,
    },
    departure_station_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Station,
        key: "id",
      },
    },
    departure_station_name: {
      type: Sequelize.STRING,
    },
    return_station_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Station,
        key: "id",
      },
    },
    return_station_name: {
      type: Sequelize.STRING,
    },
    covered_distance: {
      type: Sequelize.NUMERIC,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "journeys",
    timestamps: false,
  }
);

Journey.associate = (models) => {
  Journey.belongsTo(models.Station, {
    as: "departure_station",
    foreignKey: "departure_station_id",
  });
  Journey.belongsTo(models.Station, {
    as: "return_station",
    foreignKey: "return_station_id",
  });
};

module.exports = { Journey };
