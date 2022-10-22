import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'


const MapView = () => {
  return (
    <div>
    <MapContainer
        // style={{ height: "500px", width: "500px" }}
      zoom={12}
      center={[-32.4844, -58.2369]}
      scrollWheelZoom={true}
    >
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[-32.4844, -58.2369]}>
        <Popup>
          Local 1 <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>
    </div>
  );
}
export default MapView