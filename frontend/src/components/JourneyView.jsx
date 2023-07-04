import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import db from "../services/journeyDB";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";
import JourneyList from "./JourneyList";
import PageNavigation from "./PageNavigation";
import Search from "./Search";

const JourneyView = () => {
  const { journeys, setJourneys, options, setOptions, totalPages } =
    useContext(JourneysContext);
  const [search, setSearch] = useSearchParams();

  let currentPage = options.page;
  currentPage = currentPage === null ? 1 : currentPage;

  const updatePage = async (direction) => {
    // Get query parameters
    let page = options.page;

    // Update page number
    if (page === 1) {
      if (direction === "back") {
        //No page 0
        return;
      } else {
        page = 2;
      }
    } else {
      // If going back, decrement page
      if (direction === "back") {
        page--;
      } else {
        page++; // Otherwise, increment page
      }
    }

    // Add query parameters to url and options
    if (options.search) {
      setSearch({
        page: page,
        search: options.search,
      });
    } else {
      setSearch({
        page: page,
      });
    }

    setOptions((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Update the search property in options
  const updateSearch = (newSearch) => {
    setSearch({ page: options.page, search: newSearch });
    setOptions((prevState) => ({
      ...prevState,
      search: newSearch,
      page: 1,
    }));
  };

  // Fetch current page and fetch a new one when options change
  useEffect(() => {
    const fetchData = async () => {
      // Clean state to show loading animation
      setJourneys(null);

      // Cancel previous fetches
      db.cancelRequests();

      let page = Number.parseInt(search.get("page"));
      let journeys;

      // If no page in query or options, set page 1 in options
      if (isNaN(page) && options.page === null) {
        page = 1;

        setOptions((prevState) => ({
          ...prevState,
          page,
        }));

        return;
      }

      // If page is in query but not in options yet
      if (options.page === null) {
        const page = search.get("page");

        if (search.has("search")) {
          setOptions((prevState) => ({
            ...prevState,
            page,
            search: search.get("search"),
          }));
        } else {
          setOptions((prevState) => ({
            ...prevState,
            page,
          }));
        }

        return;
      }

      // Display query parameters from options
      if (options.search && options.page) {
        setSearch({
          page: options.page,
          search: options.search,
        });
      } else if (options.search) {
        setSearch({ search: options.search });
      } else if (options.page > 1) {
        setSearch({ page: options.page });
      }

      journeys = await db.getPage(options);
      const formatted = formatJourneys(journeys);
      setJourneys(formatted);
    };

    fetchData();
  }, [options]);

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
