import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import stationDB from "./services/stationDB";
import journeyDB from "./services/journeyDB";
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

  const [totalJourneyPages, setTotalJourneyPages] = useState(null);
  const [totalStationPages, setTotalStationPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await journeyDB.getTotalPages();
      setTotalJourneyPages(result.totalPages);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await stationDB.getTotalPages();
      setTotalStationPages(result.totalPages);
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
                totalPages={totalJourneyPages}
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
                totalPages={totalStationPages}
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
