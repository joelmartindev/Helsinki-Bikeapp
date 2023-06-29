import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { ReactComponent as CircleArrow } from "../assets/circlearrow.svg";
import { ReactComponent as Capacity } from "../assets/capacity.svg";
import { ReactComponent as Location } from "../assets/location.svg";
import StationsContext from "./StationsContext";

const StationList = () => {
  const navigate = useNavigate();
  const { stations, setStations } = useContext(StationsContext);

  if (stations === null) return <Loading />;

  const stationsMap = stations.map((station) => {
    return (
      <div
        key={station.id}
        className="group m-2 flex flex-col rounded-2xl border-x-4 border-y-2 border-transparent bg-custom-isabelline p-3 drop-shadow-md hover:scale-100 hover:bg-gray-200 hover:drop-shadow-2xl sm:flex-row"
      >
        <div className="flex items-center sm:px-2">
          <div className="min-w-0 whitespace-nowrap px-2 py-2 text-2xl font-bold text-custom-text sm:py-5 sm:text-xl">
            {station.id} -
          </div>
          <div className="min-w-0 flex-shrink break-words py-2 text-xl font-semibold text-custom-text sm:py-5 sm:text-xl">
            {station.name_fi}
          </div>
        </div>
        <div className="flex items-center sm:px-2">
          <Location className="h-5 w-5 fill-custom-text stroke-custom-text" />
          <div className="min-w-0 px-2 py-2 text-lg italic text-custom-text sm:py-5 sm:text-xl">
            {station.address_fi}
          </div>
          <div className="min-w-0 py-2 text-lg italic text-custom-text sm:py-5 sm:text-xl">
            {!station.city_fi ? station.city_fi : ""}
          </div>
        </div>
        <div className="flex flex-grow items-center sm:px-2">
          <Capacity className="h-5 w-5 flex-shrink-0 fill-custom-text stroke-custom-text" />
          <div className="min-w-0 px-2 py-2 text-lg italic text-custom-text sm:py-5 sm:text-xl">
            Capacity {station.capacity}
          </div>
          <CircleArrow
            onClick={() => navigate(`/stations/${station.id}`)}
            className="min-h-6 min-w-6 ml-auto h-10 w-10 flex-shrink-0 stroke-custom-pigment-green hover:cursor-pointer sm:h-12 sm:w-12"
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="mx-auto max-w-4xl rounded-2xl border-transparent bg-custom-onyx py-1 sm:p-5">
        {stationsMap}
      </div>
    </div>
  );
};

export default StationList;
