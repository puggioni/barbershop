import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAllOffices } from "../../slices/offices";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../../../app/store";
import L from "leaflet";

const MapView = () => {
  const dispatch = useAppDispatch();

  const inicializar = useCallback(async () => {
    dispatch(fetchAllOffices());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.offices);

  const coordenada1 = data.allOffices;

  /*   coordenada1?.map((sucursal: any) => {
    const position = [sucursal.lat, sucursal.long];
    console.log(position);
    return position;
  }); */

  const position = coordenada1?.map((sucursal: any) => {
    return [sucursal.lat, sucursal.long];
  });

  return (
    <div>
      <MapContainer
        zoom={6}
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
    </div>
  );
};
export default MapView;
