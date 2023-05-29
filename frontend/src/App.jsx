import "./App.css";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import JourneyTable from "./components/JourneyTable";
import StationTable from "./components/StationTable";
import SingleStation from "./components/SingleStation";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import journeyDB from "./services/journeyDB";
import stationDB from "./services/stationDB";
import JourneysContextLayout from "./components/JourneysContextLayout";
import StationsContextLayout from "./components/StationsContextLayout";
import formatJourneys from "./utils/journeyUtils";

const App = () => {
  const [stations, setStations] = useState(null);
  const [journeys, setJourneys] = useState(null);

  // Preload first pages of content

  useEffect(() => {
    const fetchData = async () => {
      const stations = await stationDB.getPage(1);
      setStations(stations);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const journeys = await journeyDB.getPage(1);
      const formatted = formatJourneys(journeys);
      setJourneys(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <JourneysContextLayout
                journeys={journeys}
                setJourneys={setJourneys}
              />
            }
          >
            <Route path="/journeys" element={<JourneyTable />} />
          </Route>
          <Route
            element={
              <StationsContextLayout
                stations={stations}
                setStations={setStations}
              />
            }
          >
            <Route path="/stations" element={<StationTable />} />
            <Route path="/stations/:id" element={<SingleStation />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
