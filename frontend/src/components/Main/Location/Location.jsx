import { useMapEvents } from 'react-leaflet';

export function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(`${String(e.latlng.lat) + ',' + String(e.latlng.lng)}`);
    },
  });
}
