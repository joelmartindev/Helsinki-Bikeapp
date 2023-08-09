import { useEffect } from "react";
import { Link } from "react-router-dom";
import journeyDB from "../services/journeyDB";
import { formatTime } from "../utils/journeyUtils";
import { ReactComponent as Loading } from "../assets/loading.svg";

const StatisticsView = ({ stats, setStats }) => {
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
            <h1 className="mb-5 mt-2 text-4xl">Statistics</h1>
            <div className="text-xl">
              <div>General statistics for all stations and journeys!</div>
              <div className="mt-2">
                Note: Some data like the longest journeys are odd, because it is
                difficult to know which journeys are legitimate.
              </div>
              <div className="mt-2 italic">
                Departure = Start point of a journey <br /> Return = Endpoint of
                a journey
              </div>
            </div>
            {stats ? (
              <>
                <h2 className="mb-5 mt-3 font-bold text-custom-text underline underline-offset-4">
                  Averages
                </h2>
                <div className="text-xl">
                  Journey distance: {stats.averageJourneyDistance} km
                </div>
                <div className="mb-2 text-xl">
                  Journey duration: {stats.averageJourneyTime}
                </div>
                <h2 className="mb-5 mt-5 font-bold text-custom-text underline underline-offset-4">
                  Journeys
                </h2>
                <div>
                  <div>
                    <h2 className="mt-4 border-l-4 border-custom-pigment-green px-2">
                      Longest distance
                    </h2>
                    <ol className="list-decimal">
                      {stats.longestJourneys.map((journey) => {
                        return (
                          <li
                            key={
                              journey.departure_station_name +
                              " to " +
                              journey.return_station_name
                            }
                            className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                          >
                            <Link
                              to={`/journeys/${journey.id}`}
                              className="hover:text-custom-pigment-green"
                            >
                              {journey.departure_station_name +
                                ": " +
                                (journey.covered_distance / 1000).toFixed(2)}
                              km
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <div>
                    <h2 className="mt-4 border-l-4 border-pink-300 px-2">
                      Most popular
                    </h2>
                    <ol className="list-decimal">
                      {stats.mostPopularJourneys.map((journey) => {
                        return (
                          <li
                            key={
                              journey.departure_station_id +
                              " to " +
                              journey.return_station_id
                            }
                            className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                          >
                            {journey.departure_station_name +
                              " -> " +
                              journey.return_station_name +
                              ": " +
                              journey.count}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <h2 className="mb-5 mt-5 font-bold text-custom-text underline underline-offset-4">
                    Stations
                  </h2>
                  <h3 className="mb-5 mt-3 text-xl font-bold text-custom-text">
                    Departures
                  </h3>
                  <div>
                    <h2 className="mt-4 border-l-4 border-custom-pigment-green px-2">
                      Most popular
                    </h2>
                    <ol className="list-decimal">
                      {stats.mostPopularStationsForDepartures.map((station) => {
                        return (
                          <li
                            key={station.departure_station_id}
                            className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                          >
                            <Link
                              to={`/stations/${station.departure_station_id}`}
                              className="hover:text-custom-pigment-green"
                            >
                              {station.departure_station_name +
                                ": " +
                                station.count}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <div>
                    <h2 className="mt-4 border-l-4 border-pink-300 px-2">
                      Least popular
                    </h2>
                    <ol className="list-decimal">
                      {stats.leastPopularStationsForDepartures.map(
                        (station) => {
                          return (
                            <li
                              key={station.departure_station_id}
                              className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                            >
                              <Link
                                to={`/stations/${station.departure_station_id}`}
                                className="hover:text-custom-pigment-green"
                              >
                                {station.departure_station_name +
                                  ": " +
                                  station.count}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ol>
                  </div>
                  <h3 className="mb-5 mt-5 text-xl font-bold text-custom-text">
                    Returns
                  </h3>
                  <div>
                    <h2 className="mt-4 border-l-4 border-custom-pigment-green px-2">
                      Most popular
                    </h2>
                    <ol className="list-decimal">
                      {stats.mostPopularStationsForReturns.map((station) => {
                        return (
                          <li
                            key={station.return_station_id}
                            className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                          >
                            <Link
                              to={`/stations/${station.return_station_id}`}
                              className="hover:text-custom-pigment-green"
                            >
                              {station.return_station_name +
                                ": " +
                                station.count}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <div>
                    <h2 className="mt-4 border-l-4 border-pink-300 px-2">
                      Least popular
                    </h2>
                    <ol className="list-decimal">
                      {stats.leastPopularStationsForReturns.map((station) => {
                        return (
                          <li
                            key={station.return_station_id}
                            className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                          >
                            <Link
                              to={`/stations/${station.return_station_id}`}
                              className="hover:text-custom-pigment-green"
                            >
                              {station.return_station_name +
                                ": " +
                                station.count}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;
