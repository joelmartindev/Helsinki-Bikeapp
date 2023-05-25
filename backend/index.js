const express = require("express");
const db = require("./utils/dbConfig");
const stationsRouter = require("./routes/stations");
const journeysRouter = require("./routes/journeys");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { Station } = require("./models/Station");
const { Journey } = require("./models/Journey");

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.use(express.static("dist"));
app.use("/api/stations", stationsRouter);
app.use("/api/journeys", journeysRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await db.authenticate().then(() => {
      Station.associate({ Journey });
      Journey.associate({ Station });
    });
    db.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
