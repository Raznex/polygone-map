import React, { useEffect, useState } from 'react';
import PolygonForm from './PolygonForm/PolygonForm';
import Map from '../Map/Map';
import CoordinateForm from './CoordinateForm/CoordinateForm';
import './Main.css';
import { getAllPolygons } from '../../utils/Api';
import Polygons from './Polygons/Polygons';

const Main = () => {
  const [position, setPosition] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [allPolygon, setAllPolygon] = useState([]);
  const [isPolygon, setIsPolygon] = useState(null);
  useEffect(() => {
    getAllPolygons().then((res) => {
      setAllPolygon(res);
    });
  }, [coordinates]);

  return (
    <div className='main'>
      <div className='form-container'>
        <CoordinateForm
          position={position}
          setCoordinates={setCoordinates}
          setPosition={setPosition}
        />
        <PolygonForm
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          isPolygon={isPolygon}
          setIsPolygon={setIsPolygon}
        />
      </div>
      <div className='container'>
        <Map setPosition={setPosition} coordinates={coordinates} />
        <div className='polygons-container'>
          {allPolygon.map((item, id) => (
            <Polygons
              key={id}
              item={item}
              setIsPolygon={setIsPolygon}
              setCoordinates={setCoordinates}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
