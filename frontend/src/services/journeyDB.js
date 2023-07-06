//Relative path in production
let baseURL = "";
if (import.meta.env.DEV) baseURL = import.meta.env.VITE_BASE_URL;

let controller = new AbortController();

const getPage = async (options) => {
  const page = options.page;
  const search = options.search;

  try {
    const response = await fetch(
      `${baseURL}/api/journeys?page=${page}&search=${search}`,
      {
        signal: controller.signal,
      }
    );

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

const getAvailablePages = async (search) => {
  try {
    const response = await fetch(
      `${baseURL}/api/journeys/availablePages?search=${search}`
    );
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
  getAvailablePages,
};
