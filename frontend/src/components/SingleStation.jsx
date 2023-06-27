import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as Location } from "../assets/location.svg";
import { ReactComponent as Capacity } from "../assets/capacity.svg";
import StationsContext from "./StationsContext";
import stationDB from "../services/stationDB";
import Map from "./Map";

const SingleStation = () => {
  const navigate = useNavigate();
  const id = Number(useParams("id").id);
  const { stations } = useContext(StationsContext);
  const [station, setStation] = useState(null);
  const [totalJourneys, setTotalJourneys] = useState(null);

  const fetchStation = async () => {
    const result = await stationDB.getStation(id);
    setStation(result);
  };

  useEffect(() => {
    if (stations === null) {
      fetchStation();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stationDB.getTotalJourneys(id);
      setTotalJourneys(res);
    };

    fetchData();
  }, []);

  // If no stations in memory
  if (stations === null) {
    if (station === null) {
      return <Loading />;
    }
  } else {
    // If stations in memory and no station set
    if (station === null) {
      const found = stations.find((station) => station.id === id);
      // If correct station exists in memory
      if (found) {
        setStation(found);
        return <Loading />;
      } else {
        // If stations in memory but no correct station, load the correct station
        fetchStation();
        return <Loading />;
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="ml-5 mt-5">
        <Arrow
          onClick={() => navigate(-1)}
          className="h-10 w-10 rotate-180 fill-custom-isabelline stroke-custom-isabelline hover:cursor-pointer"
        />
      </div>
      <div className="mx-auto mt-3 max-w-xl rounded-2xl bg-custom-onyx px-2 py-4 drop-shadow-2xl sm:px-4">
        <div className="rounded-2xl bg-custom-isabelline drop-shadow-2xl">
          <div className="mx-auto px-4 py-4 text-2xl leading-relaxed">
            <div className="mb-2 border-b-2 border-custom-pigment-green font-mono text-3xl font-bold text-neutral-500">
              Station #{id}: {station.name_fi}
            </div>
            <h1 className="font-bold text-custom-text underline underline-offset-4">
              Details
            </h1>
            <div className="flex items-center italic">
              <Location className="mr-2 h-5 w-5" />
              {station.address_fi}
            </div>
            {station.city === "" ? null : (
              <div className="ml-7">{station.city}</div>
            )}
            <div className="flex items-center italic">
              <Capacity className="mr-2 h-5 w-5" />
              Capacity {station.capacity}
            </div>
            <h1 className="mt-2 font-bold text-custom-text underline underline-offset-4">
              Statistics
            </h1>
            {totalJourneys === null ? (
              <Loading className="h-12 w-12" />
            ) : (
              <>
                <div>Departures {totalJourneys.departuresCount}</div>
                <div>Returns {totalJourneys.returnsCount}</div>
              </>
            )}
            <h1 className="my-2 font-bold text-custom-text underline underline-offset-4">
              Map
            </h1>
            <Map stations={[station]} height={"512px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStation;
