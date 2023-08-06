import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StationsContext from "./StationsContext";
import journeyDB from "../services/journeyDB";

const StatisticsView = () => {
  const [stats, setStats] = useState({
    longestJourney: null, // lista
    averageJourneyDistance: null, // arvo, pituus vai?
    averageJourneyTime: null, // arvo, aika vai?
    mostPopularStations: null, // lista
    leastPopularStations: null, // lista
    mostPopularJourneys: null, // lista
  });

  // lisäksi graafeja, esim activity määrä bar graph tunneittain,

  // Count avg distances
  useEffect(() => {
    const fetchData = async () => {
      let { averageJourneyDistance } = await journeyDB.getAllJourneyStats();
      averageJourneyDistance = (averageJourneyDistance / 1000).toFixed(2);
      setStats((prevStats) => ({
        ...prevStats,
        averageJourneyDistance,
      }));
    };

    fetchData();
  }, []);
  console.log(stats);
  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="mx-auto mt-3 max-w-xl rounded-2xl bg-custom-onyx px-2 py-4 drop-shadow-2xl sm:px-4">
        <div className="rounded-2xl bg-custom-isabelline drop-shadow-2xl">
          <div className="mx-auto px-4 py-4 text-2xl leading-relaxed">
            Under construction...
            {stats.averageJourneyDistance && (
              <div>
                Average distance of journey {stats.averageJourneyDistance} km
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;
