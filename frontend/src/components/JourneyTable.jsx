import { useContext, useEffect } from "react";
import db from "../services/journeyDB";
import PageNavigation from "./PageNavigation";
import { useSearchParams } from "react-router-dom";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";

const JourneyTable = () => {
  const { journeys, setJourneys } = useContext(JourneysContext);
  const [search, setSearch] = useSearchParams();

  const updatePage = async (direction) => {
    //TODO clicking journeys menu button should load first page
    //Get query parameters
    let page = Number.parseInt(search.get("page"));
    db.cancelRequests();

    // Update page number in url
    // If not direct connecting to url, but using buttons instead
    if (direction !== "same") {
      // If empty query
      console.log(page);
      if (isNaN(page)) {
        if (direction === "back") {
          //No page 0
          return;
        } else {
          page = 2;
        }
      } else {
        // If going back, decrement page
        if (direction === "back") {
          if (page !== 1) {
            page--;
          } else return;
        } else {
          page++; // Otherwise, increment page
        }
      }

      //Add query parameters to url
      setSearch({ page });
    }

    //Fetch and set data
    const res = await db.getPage(page);
    const formatted = formatJourneys(res);
    console.log(formatted);
    setJourneys(formatted);
  };

  useEffect(() => {
    // When direct connecting to url, fetch correct page
    if (search.get("page") > 1) {
      updatePage("same");
    }
  }, []);

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
    <div className="flex flex-col">
      <h1 className="mx-auto my-8 text-3xl font-semibold">Journeys</h1>
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
      <PageNavigation updatePage={updatePage} />
    </div>
  );
};

export default JourneyTable;
