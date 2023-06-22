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

export default formatJourneys;
