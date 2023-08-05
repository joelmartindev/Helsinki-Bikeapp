import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ReactComponent as Loading } from "../assets/loading.svg";
import stationDB from "../services/stationDB";
import journeyDB from "../services/journeyDB";
import {
  formatBarData,
  formatTop5Journeys,
  countDistances,
} from "../utils/journeyUtils";

const StationStats = () => {
  const [totalJourneys, setTotalJourneys] = useState(null);
  const [relatedJourneys, setRelatedJourneys] = useState(null);
  const [barData, setBarData] = useState(null);
  const [top5Journeys, setTop5Journeys] = useState(null);
  const [distances, setDistances] = useState(null);
  const id = Number(useParams("id").id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stationDB.getTotalJourneys(id);
      setTotalJourneys(res);
    };

    fetchData();
    setTotalJourneys(null);
  }, [id]);

  // Fetch related journeys data for bar graph
  useEffect(() => {
    const fetchData = async () => {
      const related = await journeyDB.getAllRelatedToStation(id);
      const formatted = formatBarData(related, id);
      setRelatedJourneys(related);
      setBarData(formatted);
    };

    fetchData();
    setRelatedJourneys(null);
    setBarData(null);
  }, [id]);

  // Format top 5 journeys (most/least common where station is departure/return)
  useEffect(() => {
    if (relatedJourneys) {
      const formatted = formatTop5Journeys(relatedJourneys, id);
      setTop5Journeys(formatted);
    } else setTop5Journeys(null);
  }, [relatedJourneys]);

  // Count avg distances
  useEffect(() => {
    if (relatedJourneys) {
      const distances = countDistances(relatedJourneys, id);
      setDistances(distances);
    } else setDistances(null);
  }, [relatedJourneys]);

  // Labels Week 1 - Week 14
  const weekLabels = [];
  if (relatedJourneys) {
    for (let i = 1; i <= barData.weeklyDepartures.length; i++) {
      weekLabels.push("Week " + i);
    }
  }

  return (
    <>
      {totalJourneys && (
        <div className="mt-2">
          <div>Departures: {totalJourneys.departuresCount}</div>
          <div>Returns: {totalJourneys.returnsCount}</div>
        </div>
      )}
      {
        // AVERAGE DISTANCE of journey starting or ending at station
        distances && (
          <>
            <div>
              Average departure: {distances.averageDepartureDistance} km
            </div>
            <div>Average return: {distances.averageReturnDistance} km</div>
          </>
        )
      }
      {top5Journeys && (
        <div className="sm:flex">
          <div>
            <h2 className="mt-4 border-l-4 border-custom-pigment-green px-2">
              Most departures to
            </h2>
            <ol className="list-decimal">
              {top5Journeys.top5MostDepartures.map((destination) => {
                return (
                  <li
                    key={destination.id}
                    className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                  >
                    <Link
                      to={`/stations/${destination.id}`}
                      className="hover:text-custom-pigment-green"
                    >
                      {destination.name + ": " + destination.count}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <h2 className="mt-3 border-l-4 border-pink-300 px-2">
              Most returns from
            </h2>
            <ol className="list-decimal">
              {top5Journeys.top5MostReturns.map((returnItem) => {
                return (
                  <li
                    key={returnItem.id}
                    className="my-2 ml-10 list-inside px-1 -indent-8 font-mono text-lg"
                  >
                    <Link
                      to={`/stations/${returnItem.id}`}
                      className="hover:text-custom-pigment-green"
                    >
                      {returnItem.name + ": " + returnItem.count}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
      {barData && totalJourneys ? (
        <Bar
          data={{
            labels: weekLabels,
            datasets: [
              {
                label: "Departures",
                data: barData.weeklyDepartures,
                backgroundColor: "#00B354",
              },
              {
                label: "Returns",
                data: barData.weeklyReturns,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
          className="mt-4"
        />
      ) : (
        <Loading className="h-12 w-12" />
      )}
    </>
  );
};

export default StationStats;
