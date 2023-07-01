import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import db from "../services/journeyDB";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";
import JourneyList from "./JourneyList";
import PageNavigation from "./PageNavigation";
import Search from "./Search";

const JourneyView = () => {
  const { journeys, setJourneys, totalPages } = useContext(JourneysContext);
  const [options, setOptions] = useState({ search: null });
  const [search, setSearch] = useSearchParams();

  let currentPage = Number.parseInt(search.get("page"));
  currentPage = isNaN(currentPage) ? 1 : currentPage;

  const updatePage = async (direction) => {
    // Get query parameters
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

    // Add query parameters to url
    setSearch({ page });

    // Clean state to show loading animation
    setJourneys(null);

    // Fetch and set data
    const res = await db.getPage(page, options);
    const formatted = formatJourneys(res);
    console.log(formatted);
    setJourneys(formatted);
  };

  // Fetch current page
  useEffect(() => {
    const fetchData = async () => {
      setJourneys(null);
      const page = Number.parseInt(search.get("page"));
      let journeys;

      if (isNaN(page)) {
        journeys = await db.getPage(1, options);
      } else {
        journeys = await db.getPage(page, options);
      }
      const formatted = formatJourneys(journeys);
      setJourneys(formatted);
    };

    fetchData();
  }, [options]);

  // Update the search property in options
  const updateSearch = (newSearch) => {
    setOptions((prevState) => ({
      ...prevState,
      search: newSearch,
    }));
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col">
      <h1 className="mx-auto mb-2 mt-8 text-4xl font-bold text-custom-isabelline drop-shadow">
        Journeys
      </h1>
      <Search
        placeholder={"Search journeys"}
        stateSetter={setJourneys}
        searchSetter={updateSearch}
      />
      <PageNavigation
        updatePage={updatePage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <JourneyList />
    </div>
  );
};

export default JourneyView;
