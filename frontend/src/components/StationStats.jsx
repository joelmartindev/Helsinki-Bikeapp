import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loading.svg";
import stationDB from "../services/stationDB";

const StationStats = () => {
  const [totalJourneys, setTotalJourneys] = useState(null);
  const id = Number(useParams("id").id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stationDB.getTotalJourneys(id);
      setTotalJourneys(res);
    };

    fetchData();
  }, []);

  return (
    <>
      {totalJourneys === null ? (
        <Loading className="h-12 w-12" />
      ) : (
        <>
          <div>Departures {totalJourneys.departuresCount}</div>
          <div>Returns {totalJourneys.returnsCount}</div>
        </>
      )}
    </>
  );
};

export default StationStats;
