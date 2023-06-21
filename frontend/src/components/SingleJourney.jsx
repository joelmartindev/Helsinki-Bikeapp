import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Loading } from "../assets/loading.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import db from "../services/journeyDB";
import formatJourneys from "../utils/journeyUtils";
import JourneysContext from "./JourneysContext";

const SingleJourney = () => {
  const navigate = useNavigate();
  const { journeys } = useContext(JourneysContext);
  const [journey, setJourney] = useState(null);
  const id = Number(useParams("id").id);

  // Fetch single journey data if no journeys data in memory (directly navigated to page)
  useEffect(() => {
    const fetchData = async () => {
      const result = await db.getJourney(id);
      const unformatted = [result];
      const formatted = formatJourneys(unformatted);
      setJourney(formatted[0]);
    };

    if (journeys === null) {
      fetchData();
    }
  }, []);

  // Single journey data not set yet
  if (journey === null) {
    // Show loading indicator while journey is being fetched
    if (journeys === null) {
      return <Loading />;
    }
    // If journeys in memory, find and set journey from them
    else {
      const found = journeys.find((journey) => journey.id === id);
      setJourney(found);
      return <Loading />; //Fixes odd bug where journey seemingly isn't set yet when it tries to render
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
      <h1 className="text-center text-4xl font-semibold text-custom-isabelline drop-shadow-2xl">
        Journey Details
      </h1>
      <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-custom-onyx px-4 py-4 drop-shadow-2xl">
        <div className="rounded-2xl bg-custom-isabelline drop-shadow-2xl">
          <div className="mx-auto px-4 py-4 text-2xl">
            <div className="text-custom-text ">
              This journey departed from{" "}
              <span
                /**onClick={navigate(`/stations/${ need to insert station id}`)} */
                className="font-semibold text-custom-pigment-green hover:cursor-pointer"
              >
                {journey.departure_station}
              </span>
            </div>
            <div className="text-custom-text">
              at <span className="font-semibold">{journey.departure}</span>
            </div>
            <div className="text-custom-text ">
              and arrived at{" "}
              <span className="font-semibold text-custom-pigment-green hover:cursor-pointer">
                {journey.return_station}
              </span>
            </div>
            <div className="text-custom-text ">
              on <span className="font-semibold">{journey.return}</span>
            </div>
            <div className="text-custom-text ">
              The journey covered{" "}
              <span className="font-semibold">{journey.covered_distance}</span>{" "}
              in <span className="font-semibold">{journey.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJourney;