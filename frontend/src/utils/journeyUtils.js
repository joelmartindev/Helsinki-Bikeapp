const formatJourneys = (unformatted) => {
  let formatted = [];

  unformatted.map((journey) => {
    formatted.push({
      id: journey.id,
      departure: formatDate(journey.departure),
      return: formatDate(journey.return),
      departure_station_id: journey.departure_station_id,
      departure_station: journey.departure_station_name,
      return_station_id: journey.return_station_id,
      return_station: journey.return_station_name,
      covered_distance: (journey.covered_distance / 1000).toFixed(1) + "km",
      duration: formatTime(journey.duration),
    });
  });

  return formatted;
};

// For statistics in single station view
const formatStatsData = (data, id) => {
  // Filter journeys into departures and returns based on the given station ID
  const departures = data.filter(
    (journey) => journey.departure_station_id === id
  );
  const returns = data.filter((journey) => journey.return_station_id === id);

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInWeek = 604800000;
    return Math.ceil((date - oneJan) / millisecondsInWeek + 1);
  };

  // Set the season start and end dates (1.5.2021 - 31.7.2021)
  const seasonStart = new Date("2021-05-01");
  const seasonEnd = new Date("2021-07-31");

  const weeklyDepartures = [];
  const weeklyReturns = [];

  // Initialize the weekly departures and returns arrays with 0s
  const numWeeks = getWeekNumber(seasonEnd) - getWeekNumber(seasonStart) + 1;
  for (let i = 0; i < numWeeks; i++) {
    weeklyDepartures.push(0);
    weeklyReturns.push(0);
  }

  departures.forEach((departure) => {
    const departureDate = new Date(departure.departure);
    const weekNumber =
      getWeekNumber(departureDate) - getWeekNumber(seasonStart);
    weeklyDepartures[weekNumber]++;
  });

  returns.forEach((returnItem) => {
    const returnDate = new Date(returnItem.return);
    const weekNumber = getWeekNumber(returnDate) - getWeekNumber(seasonStart);
    weeklyReturns[weekNumber]++;
  });

  return { weeklyDepartures, weeklyReturns };
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatTime = (s) => {
  //Format like 0m00s
  return (s - (s %= 60)) / 60 + (9 < s ? "m" : "m0") + s + "s";
};

export { formatJourneys, formatStatsData };
