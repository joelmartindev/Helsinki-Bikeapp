import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import JourneyTable from "./components/JourneyTable";
import StationTable from "./components/StationTable";
import SingleStation from "./components/SingleStation";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import stationDB from "./services/stationDB";
import StationsContextLayout from "./components/StationsContextLayout";

const App = () => {
  const [stations, setStations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await stationDB.getAll();
      console.log("Fetched stations");
      setStations(stations);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/journeys" element={<JourneyTable />} />
          <Route element={<StationsContextLayout stations={stations} />}>
            <Route path="/stations" element={<StationTable />} />
            <Route path="/stations/:id" element={<SingleStation />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
