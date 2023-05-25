//Relative path in production
let baseURL = "";
if (import.meta.env.DEV) baseURL = import.meta.env.VITE_BASE_URL;

const getAll = async () => {
  const response = await fetch(`${baseURL}/api/stations`);
  const jsonData = await response.json();
  return jsonData;
};

const getTotalJourneys = async (id) => {
  const response = await fetch(`${baseURL}/api/stations/${id}/journeys`);
  const jsonData = await response.json();
  return jsonData;
};

export default {
  getAll,
  getTotalJourneys,
};
