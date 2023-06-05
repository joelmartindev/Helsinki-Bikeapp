import { useContext } from "react";
import JourneysContext from "./JourneysContext";

const JourneyTable = () => {
  const { journeys, setJourneys } = useContext(JourneysContext);

  if (journeys === null) return <>Loading journeys... </>; //TODO Better loading screen

  const journeysMap = journeys.map((journey) => {
    return (
      <tr
        key={journey.id}
        className="mx-auto flex border-collapse flex-col border-x-4 border-transparent bg-neutral-100 text-left hover:scale-100 hover:border-x-4 hover:border-x-custom-malachite  hover:shadow-lg sm:table-row"
      >
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
    <>
      <table className="w-full table-fixed text-center shadow-md">
        <thead>
          <tr className="hidden bg-neutral-100 shadow-xl sm:table-row">
            <th className="py-4">Departure station</th>
            <th className="py-4">Return station</th>
            <th className="py-4">Covered distance</th>
            <th className="py-4">Duration</th>
          </tr>
        </thead>
        <tbody>{journeysMap}</tbody>
      </table>
    </>
  );
};

export default JourneyTable;
