// Format data into a more readable type
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

// For bar graph statistics in single station view
const formatBarData = (data, id) => {
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

const formatTop5Journeys = (journeys, currentStationId) => {
  // Filter journeys where the current station is the starting point (departure)
  const departureJourneys = journeys.filter(
    (journey) => journey.departure_station_id === currentStationId
  );

  // Go through every journey departing from current station, add +1 to the destination stations count
  const destinationCounts = departureJourneys.reduce((counts, journey) => {
    // Get the ID of the destination station for the current journey
    const destinationStationId = journey.return_station_id;
    // Increment the count for the destination station by 1
    counts[destinationStationId] = (counts[destinationStationId] || 0) + 1;
    return counts;
  }, {});

  // Sort destinations based on count in descending order, select top 5, create object with id, name and count
  const top5MostDepartures = Object.entries(destinationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([destinationId, count]) => {
      const journey = journeys.find(
        (journey) => journey.return_station_id == destinationId
      );
      const name = journey.return_station_name;
      return { id: destinationId, name, count };
    });

  // Filter journeys where the current station is the return station (end of journey)
  const returnJourneys = journeys.filter(
    (journey) => journey.return_station_id === currentStationId
  );

  // Go through every journey stopping at current station, add +1 to the departure stations count
  const returnCounts = returnJourneys.reduce((counts, journey) => {
    // Get the ID of the departure station for the current journey
    const departureStationId = journey.departure_station_id;
    // Increment the count for the departure station by 1
    counts[departureStationId] = (counts[departureStationId] || 0) + 1;
    return counts;
  }, {});

  // Sort returns based on count in descending order, select top 5, create object with id, name and count
  const top5MostReturns = Object.entries(returnCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([destinationId, count]) => {
      const journey = journeys.find(
        (journey) => journey.departure_station_id == destinationId
      );
      const name = journey.departure_station_name;
      return { id: destinationId, name, count };
    });

  return {
    top5MostDepartures,
    top5MostReturns,
  };
};

const countDistances = (journeys, currentStationId) => {
  // Filter journeys where the current station is the starting point (departure)
  const departureJourneys = journeys.filter(
    (journey) => journey.departure_station_id === currentStationId
  );

  // Calculate total distance of all departure journeys
  const totalDepartureDistance = departureJourneys.reduce((total, journey) => {
    return total + Number(journey.covered_distance);
  }, 0);

  // Calculate average distance of departure journeys, convert from 1234 meters to 1.23
  const averageDepartureDistance = (
    totalDepartureDistance /
    departureJourneys.length /
    1000
  ).toFixed(2);

  // Filter journeys where the current station is the return station (end of journey)
  const returnJourneys = journeys.filter(
    (journey) => journey.return_station_id === currentStationId
  );

  // Calculate total distance of all return journeys
  const totalReturnDistance = returnJourneys.reduce((total, journey) => {
    return total + Number(journey.covered_distance);
  }, 0);

  // Calculate average distance of return journeys, convert from 1234 meters to 1.23
  const averageReturnDistance = (
    totalReturnDistance /
    returnJourneys.length /
    1000
  ).toFixed(2);

  return {
    averageDepartureDistance,
    averageReturnDistance,
  };
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

export { formatJourneys, formatBarData, formatTop5Journeys, countDistances };
