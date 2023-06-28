//Relative path in production
let baseURL = "";
if (import.meta.env.DEV) baseURL = import.meta.env.VITE_BASE_URL;

const getPage = async (page) => {
  const response = await fetch(`${baseURL}/api/stations?page=${page}`);
  const jsonData = await response.json();
  return jsonData;
};

const getTotalJourneys = async (id) => {
  const response = await fetch(`${baseURL}/api/stations/${id}/journeys`);
  const jsonData = await response.json();
  return jsonData;
};

const getTotalPages = async () => {
  try {
    const response = await fetch(`${baseURL}/api/stations/totalPages`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getStation = async (id) => {
  try {
    const response = await fetch(`${baseURL}/api/stations/${id}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getTwoStations = async (departure_station_id, return_station_id) => {
  try {
    const response = await fetch(
      `${baseURL}/api/stations/twoStations?departure=${departure_station_id}&return=${return_station_id}`
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  const response = await fetch(`${baseURL}/api/stations/all`);
  const jsonData = await response.json();
  return jsonData;
};

export default {
  getPage,
  getTotalJourneys,
  getTotalPages,
  getStation,
  getTwoStations,
  getAll,
};
