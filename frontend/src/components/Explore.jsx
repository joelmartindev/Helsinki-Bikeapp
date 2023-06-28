import { useState, useEffect, useContext } from "react";
import { ReactComponent as Loading } from "../assets/loading.svg";
import stationDB from "../services/stationDB";
import StationsContext from "./StationsContext";
import Map from "./Map";

const Explore = () => {
  const { stations, setStations } = useContext(StationsContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stationDB.getAll();
      setStations(res);
    };
    if (stations === null || stations.length <= 10) {
      fetchData();
    }
  }, []);

  if (stations === null) {
    return <Loading />;
  } else if (stations.length <= 10) {
    return <Loading />;
  }

  return <Map stations={stations} />;
};

export default Explore;
