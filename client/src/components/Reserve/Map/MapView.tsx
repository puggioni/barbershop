import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { fetchAllOffices } from "../../slices/offices";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../../../app/store";

const MapView = () => {
  const dispatch = useAppDispatch();

  const inicializar = useCallback(async () => {
    dispatch(fetchAllOffices());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.offices);

  const coordenada1 = data.allOffices
  coordenada1?.map((sucursal:any)=>{
    const position = [sucursal.lat, sucursal.long]
    console.log(position)
  })
  return (
    <div>
    <MapContainer
      zoom={6}
      center={[-32.901729, -61.725556]}
      scrollWheelZoom={true}
    >

    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    />

    {coordenada1?.map((sucursal)=>{
      return (
    <Marker position={[sucursal.lat, sucursal.long]}>
      <Popup >
        Henry-BarberShop
      </Popup>
    </Marker>
      )
    })}

    </MapContainer>
    </div>
  );
}
export default MapView