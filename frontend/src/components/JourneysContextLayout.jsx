import { Outlet } from "react-router-dom";
import JourneysContext from "./JourneysContext";

const JourneysContextLayout = ({ journeys, setJourneys }) => {
  return (
    <JourneysContext.Provider value={{ journeys, setJourneys }}>
      <Outlet />
    </JourneysContext.Provider>
  );
};

export default JourneysContextLayout;
