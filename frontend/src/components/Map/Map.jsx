import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

import React from 'react';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LocationMarker } from '../Main/Location/Location';
import { transformCoordinatesToArray } from '../../utils/transformCoordinates';

const Map = ({ setPosition, coordinates }) => {
  const polygone = transformCoordinatesToArray(coordinates);
  const purpleOptions = { color: 'purple' };
  const positionMe = [59.938678, 30.314474];
  return (
    <MapContainer center={positionMe} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker setPosition={setPosition} />
      <Polygon pathOptions={purpleOptions} positions={polygone} />
    </MapContainer>
  );
};

export default Map;
