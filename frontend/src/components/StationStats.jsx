import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ReactComponent as Loading } from "../assets/loading.svg";
import stationDB from "../services/stationDB";
import journeyDB from "../services/journeyDB";
import { formatStatsData } from "../utils/journeyUtils";

const StationStats = () => {
  const [totalJourneys, setTotalJourneys] = useState(null);
  const [relatedJourneys, setRelatedJourneys] = useState(null);
  const id = Number(useParams("id").id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stationDB.getTotalJourneys(id);
      setTotalJourneys(res);
    };

    fetchData();
  }, []);

  // Fetch data for bar graph
  useEffect(() => {
    const fetchData = async () => {
      const related = await journeyDB.getAllRelatedToStation(id);
      const formatted = formatStatsData(related, id);
      setRelatedJourneys(formatted);
    };

    fetchData();
  }, []);

  // Labels Week 1 - Week 14
  const weekLabels = [];
  if (relatedJourneys) {
    for (let i = 1; i <= relatedJourneys.weeklyDepartures.length; i++) {
      weekLabels.push("Week " + i);
    }
  }

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
      {relatedJourneys && (
        <Bar
          data={{
            labels: weekLabels,
            datasets: [
              {
                label: "Departures",
                data: relatedJourneys.weeklyDepartures,
                backgroundColor: "#00B354",
              },
              {
                label: "Returns",
                data: relatedJourneys.weeklyReturns,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
          className="mt-2"
        />
      )}
    </>
  );
};

export default StationStats;
