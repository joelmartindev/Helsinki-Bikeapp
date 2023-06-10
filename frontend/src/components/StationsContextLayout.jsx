import { Outlet } from "react-router-dom";
import StationsContext from "./StationsContext";

const StationsContextLayout = ({ stations, setStations, totalPages }) => {
  return (
    <StationsContext.Provider value={{ stations, setStations, totalPages }}>
      <Outlet />
    </StationsContext.Provider>
  );
};

export default StationsContextLayout;
