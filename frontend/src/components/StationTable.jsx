import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StationsContext from "./StationsContext";

const StationTable = () => {
  const navigate = useNavigate();
  const stations = useContext(StationsContext);

  if (stations === null) return <>Fetching data...</>;

  const stationsMap = stations.map((station) => {
    return (
      <tr
        key={station.id}
        onClick={() => navigate(`/stations/${station.id}`)}
        className="flex border-collapse flex-col border border-slate-700 text-left sm:table-row"
      >
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['ID:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{station.id}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['Name:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{station.name_fi}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['Address:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{station.address_fi}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['City:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{station.city_fi}</div>
        </td>
        <td className="grid grid-cols-2 px-3 py-2 pt-6 before:content-['Capacity:_\00a0'] sm:table-cell sm:py-10 sm:before:content-none">
          <div className="text-left sm:text-center">{station.capacity}</div>
        </td>
      </tr>
    );
  });

  return (
    <table className="w-full table-fixed border-collapse border border-slate-500 text-center">
      <thead>
        <tr className="hidden border border-slate-600 sm:table-row">
          <th className="py-4">ID</th>
          <th className="py-4">Name</th>
          <th className="py-4">Address</th>
          <th className="py-4">City</th>
          <th className="py-4">Capacity</th>
        </tr>
      </thead>
      <tbody>{stationsMap}</tbody>
    </table>
  );
};

export default StationTable;
