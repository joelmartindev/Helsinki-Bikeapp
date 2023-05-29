import { useContext } from "react";
import db from "../services/journeyDB";
import PageNavigation from "./PageNavigation";
import { useSearchParams } from "react-router-dom";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";

const JourneyTable = () => {
  const { journeys, setJourneys } = useContext(JourneysContext);
  const [search, setSearch] = useSearchParams();

  const updatePage = async () => {
    //TODO clicking journeys menu button should load first page
    //Get query parameters
    let page = search.get("page");
    console.log(journeys);
    // If empty query
    if (page == null) {
      page = 2;
    } else page++; //TODO only changes to next page right now

    //Add query parameters to url
    setSearch({ page });

    //Fetch and set data
    const res = await db.getPage(page);
    const formatted = formatJourneys(res);
    setJourneys(formatted);
  };

  if (journeys === null) return <>Loading journeys... </>; //TODO Better loading screen

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
      <PageNavigation updatePage={updatePage} />
    </div>
  );
};

export default JourneyTable;
