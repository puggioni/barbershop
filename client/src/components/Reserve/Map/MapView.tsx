import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { fetchAllOffices } from "../../slices/offices";

const MapView = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.offices);
  const coordenada1 = data.allOffices;
  const position = coordenada1?.map((sucursal: any) => {
    return [sucursal.lat, sucursal.long];
  });

  useEffect(() => {
    dispatch(fetchAllOffices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //================render====================
  return (
    <MapContainer
      style={{ zIndex: 1 }}
      zoom={4}
      center={[-32.94682, -60.63932]}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {position?.map((sucursal: any) => {
        return (
          <Marker
            position={sucursal}
            icon={
              new L.Icon({
                iconUrl: "https://img.icons8.com/ios/50/000000/pin3.png",
              })
            }
          >
            <Popup>Henry-BarberShop</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
export default MapView;
