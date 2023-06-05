import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import db from "../services/journeyDB";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";
import JourneyTable from "./JourneyTable";
import PageNavigation from "./PageNavigation";

const JourneyView = () => {
  const { journeys, setJourneys } = useContext(JourneysContext);
  const [search, setSearch] = useSearchParams();

  const updatePage = async (direction) => {
    //TODO clicking journeys menu button should load first page
    //Get query parameters
    let page = Number.parseInt(search.get("page"));
    db.cancelRequests();

    // Update page number
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

    // Clean state to show loading animation
    setJourneys(null);

    //Fetch and set data
    const res = await db.getPage(page);
    const formatted = formatJourneys(res);
    console.log(formatted);
    setJourneys(formatted);
  };

  useEffect(() => {
    const fetchData = async () => {
      const page = Number.parseInt(search.get("page"));
      let journeys;
      if (isNaN(page)) {
        journeys = await db.getPage(1);
      } else {
        journeys = await db.getPage(page);
      }
      const formatted = formatJourneys(journeys);
      setJourneys(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto my-8 text-3xl font-semibold">Journeys</h1>
      <PageNavigation updatePage={updatePage} />
      <JourneyTable />
    </div>
  );
};

export default JourneyView;
