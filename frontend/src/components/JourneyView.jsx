import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import db from "../services/journeyDB";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";
import JourneyList from "./JourneyList";
import PageNavigation from "./PageNavigation";
import Search from "./Search";

const JourneyView = () => {
  const { journeys, setJourneys, options, setOptions } =
    useContext(JourneysContext);
  const [search, setSearch] = useSearchParams();
  const [totalPages, setTotalPages] = useState(null);
  const [availablePages, setAvailablePages] = useState({
    search: null,
    pages: null,
  });

  let currentPage = options.page;
  currentPage = currentPage === null ? 1 : currentPage;

  // Next or back navigation button pressed
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
    if (newSearch === "") {
      setOptions((prevState) => ({
        ...prevState,
        search: null,
        page: 1,
      }));
    } else {
      setOptions((prevState) => ({
        ...prevState,
        search: newSearch,
        page: 1,
      }));
    }
  };

  // Fetch total pages when viewing all journeys
  useEffect(() => {
    const fetchData = async () => {
      const result = await db.getTotalPages();
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, []);

  // Get total pages available with current options; get only when a search has been done
  const fetchAvailablePages = async () => {
    if (options.search === null) {
      console.log("Default options used");
      setAvailablePages({ search: null, pages: null });
    } else if (availablePages.search === options.search) {
      // Search has not changed
      return;
    } else {
      const result = await db.getAvailablePages(options.search);
      setAvailablePages({ search: options.search, pages: result.totalPages });
    }
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
    fetchAvailablePages();
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
        availablePages={availablePages.pages}
        currentPage={currentPage}
      />
      <JourneyList />
    </div>
  );
};

export default JourneyView;
