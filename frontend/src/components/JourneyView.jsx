import { useContext, useEffect } from "react";
import db from "../services/journeyDB";
import PageNavigation from "./PageNavigation";
import { useSearchParams } from "react-router-dom";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";
import JourneyTable from "./JourneyTable";

const JourneyView = () => {
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

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto my-8 text-3xl font-semibold">Journeys</h1>
      <JourneyTable />
      <PageNavigation updatePage={updatePage} />
    </div>
  );
};

export default JourneyView;
