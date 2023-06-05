import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import journeyDB from "./services/journeyDB";
import stationDB from "./services/stationDB";
import formatJourneys from "./utils/journeyUtils";
import RootLayout from "./components/RootLayout";
import JourneysContextLayout from "./components/JourneysContextLayout";
import StationsContextLayout from "./components/StationsContextLayout";
import Home from "./components/Home";
import JourneyView from "./components/JourneyView";
import StationView from "./components/StationView";
import SingleStation from "./components/SingleStation";

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
    <>
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
            <Route path="/journeys" element={<JourneyView />} />
          </Route>
          <Route
            element={
              <StationsContextLayout
                stations={stations}
                setStations={setStations}
              />
            }
          >
            <Route path="/stations" element={<StationView />} />
            <Route path="/stations/:id" element={<SingleStation />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
