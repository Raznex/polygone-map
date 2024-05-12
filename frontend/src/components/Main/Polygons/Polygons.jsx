import React from 'react';
import { transformCoordinatesToString } from '../../../utils/transformCoordinates';

const Polygons = ({ item, setIsPolygon, setCoordinates }) => {
  return (
    <>
      <button
        className='button-name'
        onClick={() => {
          setIsPolygon(item);
          setCoordinates(
            transformCoordinatesToString(item.polygon.coordinates)
          );
        }}
      >
        {item.name}
      </button>
    </>
  );
};
export default Polygons;
