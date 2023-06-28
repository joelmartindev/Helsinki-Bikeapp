import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { Link } from "react-router-dom";

const Map = ({ stations, height }) => {
  return (
    <MapContainer
      center={
        stations.length > 2
          ? ["60.1710558", "24.9415421"] // Explore view, center on Central Railway Station
          : [stations[0].coord_y, stations[0].coord_x] // Single station or single journey view
      }
      zoom={
        stations.length > 2
          ? 13 // Explore view
          : 17 // Single station or single journey view
      }
      scrollWheelZoom={false}
      style={{ height }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => {
        return (
          <Marker
            key={station.id}
            position={[station.coord_y, station.coord_x]}
            icon={
              new Icon({
                iconUrl: markerIcon,
                iconSize: [25, 41],
                iconAnchor: [12, 18],
              })
            }
          >
            <Popup>
              <Link to={`/stations/${station.id}`}>{station.name_fi}</Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
