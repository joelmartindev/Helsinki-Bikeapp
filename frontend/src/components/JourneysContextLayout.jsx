import { Outlet } from "react-router-dom";
import JourneysContext from "./JourneysContext";

const JourneysContextLayout = ({
  journeys,
  setJourneys,
  options,
  setOptions,
}) => {
  return (
    <JourneysContext.Provider
      value={{ journeys, setJourneys, options, setOptions }}
    >
      <Outlet />
    </JourneysContext.Provider>
  );
};

export default JourneysContextLayout;
