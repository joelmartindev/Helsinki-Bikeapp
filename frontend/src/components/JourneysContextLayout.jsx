import { Outlet } from "react-router-dom";
import JourneysContext from "./JourneysContext";

const JourneysContextLayout = ({ journeys, setJourneys, totalPages }) => {
  return (
    <JourneysContext.Provider value={{ journeys, setJourneys, totalPages }}>
      <Outlet />
    </JourneysContext.Provider>
  );
};

export default JourneysContextLayout;
