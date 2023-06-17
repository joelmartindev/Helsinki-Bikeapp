import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as CircleArrow } from "../assets/circlearrow.svg";
import { ReactComponent as Distance } from "../assets/distance.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import JourneysContext from "./JourneysContext";

const JourneyTable = () => {
  const navigate = useNavigate();
  const { journeys, setJourneys } = useContext(JourneysContext);

  if (journeys === null) return <Loading />;

  const journeysMap = journeys.map((journey) => {
    return (
      <div
        key={journey.id}
        className="group m-2 flex flex-col rounded-2xl border-x-4 border-y-2 border-transparent bg-custom-isabelline p-3 drop-shadow-md hover:scale-100 hover:drop-shadow-2xl sm:flex-row"
      >
        <div id="stations" className="flex items-center">
          <div className="min-w-0 flex-shrink overflow-hidden break-words px-3 py-2 text-lg font-semibold text-custom-text sm:py-5 sm:text-xl">
            {journey.departure_station}
          </div>
          <Arrow className="min-h-5 min-w-5 h-5 w-5 flex-shrink-0 fill-custom-text stroke-custom-text" />
          <div className="min-w-0 flex-shrink overflow-hidden break-words px-3 py-2 text-lg font-semibold text-custom-text sm:py-5 sm:pr-4 sm:text-xl">
            {journey.return_station}
          </div>
        </div>
        <div id="stats" className="flex flex-grow items-center">
          <Distance className="h-5 w-5 flex-shrink-0 stroke-custom-text" />
          <div className="overflow-hidden break-words px-3 py-2 text-lg font-normal italic text-custom-text sm:py-5">
            {journey.covered_distance}
          </div>
          <Clock className="h-5 w-5 flex-shrink-0 stroke-custom-text" />
          <div className="overflow-hidden break-words px-2 py-2 text-lg font-normal italic text-custom-text sm:py-5">
            {journey.duration}
          </div>
          <CircleArrow
            onClick={() => navigate(`/journeys/${journey.id}`)}
            className="min-h-6 min-w-6 ml-auto h-10 w-10 flex-shrink-0 place-self-center stroke-custom-pigment-green hover:cursor-pointer sm:hidden sm:h-12 sm:w-12 sm:group-hover:block"
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="mx-auto max-w-4xl rounded-2xl border-transparent bg-custom-onyx py-1 sm:p-5">
        {journeysMap}
      </div>
    </div>
  );
};

export default JourneyTable;
