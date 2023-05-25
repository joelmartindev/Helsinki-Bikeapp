//Relative path in production
let baseURL = "";
if (import.meta.env.DEV) baseURL = import.meta.env.VITE_BASE_URL;

const getAll = async () => {
  const response = await fetch(`${baseURL}/api/journeys`);
  const jsonData = await response.json();
  return jsonData;
};

export default {
  getAll,
};
