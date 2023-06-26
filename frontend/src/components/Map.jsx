import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ coord_y, coord_x, height, name }) => {
  return (
    <MapContainer center={[coord_y, coord_x]} zoom={15} style={{ height }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coord_y, coord_x]}>
        <Popup>
          <h1>{name}</h1>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
