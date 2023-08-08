import { useEffect, useState } from "react";
import journeyDB from "../services/journeyDB";
import { formatTime } from "../utils/journeyUtils";
import { ReactComponent as Loading } from "../assets/loading.svg";

const StatisticsView = () => {
  const [stats, setStats] = useState({
    averageJourneyDistance: null,
    averageJourneyTime: null,
    longestJourneys: null,
    mostPopularJourneys: null,
    mostPopularStations: null,
    leastPopularStations: null,
  });

  // Fetch all statistics related to journeys and stations
  useEffect(() => {
    const fetchData = async () => {
      let {
        averageJourneyDistance,
        averageJourneyTime,
        longestJourneys,
        mostPopularJourneys,
        mostPopularStationsForDepartures,
        leastPopularStationsForDepartures,
        mostPopularStationsForReturns,
        leastPopularStationsForReturns,
      } = await journeyDB.getAllJourneyStats();

      // Format journey data
      averageJourneyTime = formatTime(averageJourneyTime);
      averageJourneyDistance = (averageJourneyDistance / 1000).toFixed(2);

      setStats({
        averageJourneyDistance,
        averageJourneyTime,
        longestJourneys,
        mostPopularJourneys,
        mostPopularStationsForDepartures,
        leastPopularStationsForDepartures,
        mostPopularStationsForReturns,
        leastPopularStationsForReturns,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="mx-auto mt-3 max-w-xl rounded-2xl bg-custom-onyx px-2 py-4 drop-shadow-2xl sm:px-4">
        <div className="rounded-2xl bg-custom-isabelline drop-shadow-2xl">
          <div className="mx-auto px-4 py-4 text-2xl leading-relaxed">
            Under construction...
            {
              //tää ei toimi !stats && <Loading />
            }
            {stats.averageJourneyDistance && (
              <>
                <div>
                  Average distance of journey {stats.averageJourneyDistance} km
                </div>
                <div>Average time of journey {stats.averageJourneyTime}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;
