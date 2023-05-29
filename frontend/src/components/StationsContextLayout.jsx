import { Outlet } from "react-router-dom";
import StationsContext from "./StationsContext";

const StationsContextLayout = ({ stations, setStations }) => {
  return (
    <StationsContext.Provider value={{ stations, setStations }}>
      <Outlet />
    </StationsContext.Provider>
  );
};

export default StationsContextLayout;
