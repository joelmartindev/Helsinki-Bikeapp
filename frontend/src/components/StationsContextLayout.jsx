import { Outlet } from "react-router-dom";
import StationsContext from "./StationsContext";

const StationsContextLayout = ({
  stations,
  setStations,
  options,
  setOptions,
}) => {
  return (
    <StationsContext.Provider
      value={{ stations, setStations, options, setOptions }}
    >
      <Outlet />
    </StationsContext.Provider>
  );
};

export default StationsContextLayout;
