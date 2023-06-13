import { useContext } from "react";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as CircleArrow } from "../assets/circlearrow.svg";
import JourneysContext from "./JourneysContext";

const JourneyTable = () => {
  const { journeys, setJourneys } = useContext(JourneysContext);

  if (journeys === null) return <Loading />;

  const journeysMap = journeys.map((journey) => {
    return (
      <div
        key={journey.id}
        className="mx-2 my-2 flex flex-col items-center rounded border-x-4 border-transparent bg-white drop-shadow-md hover:scale-100 hover:border-x-4 hover:border-x-custom-malachite hover:shadow-lg min-[450px]:flex-row"
      >
        <div id="stations" className="flex items-center">
          <div className="px-3 py-2 sm:py-5">
            <div className="text-xl">{journey.departure_station}</div>
          </div>
          <Arrow className="h-5 w-5" />
          <div className=" px-3 py-2 sm:py-5 ">
            <div className="text-xl">{journey.return_station}</div>
          </div>
        </div>
        <div id="stats" className="flex items-center">
          <div className=" px-3 py-2 sm:py-5 ">
            <div className="">{journey.covered_distance}</div>
          </div>
          <div className="px-3 py-2 sm:py-5">
            <div className="">{journey.duration}</div>
          </div>
        </div>
        <CircleArrow className="ml-auto h-6 w-6 stroke-custom-eerie-black" />
      </div>
    );
  });

  return (
    <div>
      <div className="mx-auto max-w-4xl">{journeysMap}</div>
    </div>
  );
};

export default JourneyTable;
