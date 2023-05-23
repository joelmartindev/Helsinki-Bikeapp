import { useState, useEffect } from "react";
import db from "../services/journeyDB";

const JourneyTable = () => {
  const [journeys, setJourneys] = useState(null);

  const formatJourneys = (unformatted) => {
    let formatted = [];

    unformatted.map((journey) => {
      formatted.push({
        id: journey.id,
        departure: journey.departure,
        return: journey.return,
        departure_station:
          journey.departure_station_id + " - " + journey.departure_station_name,
        return_station:
          journey.return_station_id + " - " + journey.return_station_name,
        covered_distance: journey.covered_distance / 1000 + "km",
        duration: formatTime(journey.duration),
      });
    });

    return formatted;
  };

  const formatTime = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? "m" : "m0") + s + "s";
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.getAll();
      console.log(res);
      const formatted = formatJourneys(res);
      setJourneys(formatted);
    };

    fetchData();
  }, []);

  if (journeys === null) return <>Loading list...</>;

  const journeysMap = journeys.map((journey) => {
    return (
      <tr
        key={journey.id}
        className="flex border-collapse flex-col border border-slate-700 text-left sm:table-row"
      >
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['Departure:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{journey.departure}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 before:content-['Return:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{journey.return}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 before:content-['Departure_station:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">
            {journey.departure_station}
          </div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 before:content-['Return_station:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">
            {journey.return_station}
          </div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 before:content-['Covered_distance:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">
            {journey.covered_distance}
          </div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 pb-6 before:content-['Duration:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{journey.duration}</div>
        </td>
      </tr>
    );
  });

  return (
    <div className="">
      <table className="w-full table-fixed border-collapse border border-slate-500 text-center">
        <thead>
          <tr className="hidden border border-slate-600 sm:table-row">
            <th className="py-4">Departure</th>
            <th className="py-4">Return</th>
            <th className="py-4">Departure station</th>
            <th className="py-4">Return station</th>
            <th className="py-4">Covered distance</th>
            <th className="py-4">Duration</th>
          </tr>
        </thead>
        <tbody>{journeysMap}</tbody>
      </table>
    </div>
  );
};

export default JourneyTable;
