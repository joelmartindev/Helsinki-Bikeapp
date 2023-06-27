import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";

const Map = ({ stations, height }) => {
  return (
    <MapContainer
      center={[stations[0].coord_y, stations[0].coord_x]}
      zoom={15}
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
              <h1>{station.name_fi}</h1>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
