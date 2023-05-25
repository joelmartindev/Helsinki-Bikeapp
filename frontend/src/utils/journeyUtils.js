const formatJourneys = (unformatted) => {
  let formatted = [];

  unformatted.map((journey) => {
    formatted.push({
      id: journey.id,
      departure: journey.departure,
      return: journey.return,
      departure_station:
        journey.departure_station_id + " - " + journey.departure_station_name,
      return_station:
        journey.return_station_id + " - " + journey.return_station_name,
      covered_distance: journey.covered_distance / 1000 + "km",
      duration: formatTime(journey.duration),
    });
  });

  return formatted;
};

const formatTime = (s) => {
  //Format like 0m00s
  return (s - (s %= 60)) / 60 + (9 < s ? "m" : "m0") + s + "s";
};

export default formatJourneys;
