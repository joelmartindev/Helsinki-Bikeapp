//Relative path in production
let baseURL = "";
if (import.meta.env.DEV) baseURL = import.meta.env.VITE_BASE_URL;

let controller = new AbortController();

const getPage = async (page) => {
  try {
    const response = await fetch(`${baseURL}/api/journeys?page=${page}`, {
      signal: controller.signal,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", error);
    }
  }
};

const getTotalPages = async () => {
  try {
    const response = await fetch(`${baseURL}/api/journeys/totalPages`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getJourney = async (id) => {
  try {
    const response = await fetch(`${baseURL}/api/journeys/${id}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const cancelRequests = () => {
  controller.abort();
  controller = new AbortController();
};

export default {
  getPage,
  getTotalPages,
  cancelRequests,
  getJourney,
};
