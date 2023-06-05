import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StationsContext from "./StationsContext";
import db from "../services/stationDB";
import PageNavigation from "./PageNavigation";
import StationTable from "./StationTable";

const StationView = () => {
  const [search, setSearch] = useSearchParams();
  const { stations, setStations } = useContext(StationsContext);

  const updatePage = async (direction) => {
    //TODO clicking journeys menu button should load first page
    //Get query parameters
    let page = Number.parseInt(search.get("page"));

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
    setStations(null);

    //Fetch and set data
    const stations = await db.getPage(page);
    setStations(stations);
  };

  useEffect(() => {
    const fetchData = async () => {
      const page = Number.parseInt(search.get("page"));
      let stations;
      if (isNaN(page)) {
        stations = await db.getPage(1);
      } else {
        stations = await db.getPage(page);
      }
      setStations(stations);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto my-8 text-3xl font-semibold">Stations</h1>
      <PageNavigation updatePage={updatePage} />
      <StationTable />
    </div>
  );
};

export default StationView;