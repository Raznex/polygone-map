import { transformCoordinatesToArray } from './transformCoordinates';

export function transformData(data, coordinates) {
  const firstValue = coordinates[0];
  const modifiedCoordinates = [...coordinates, firstValue];
  const transformedCoordinates =
    transformCoordinatesToArray(modifiedCoordinates);
  return {
    name: data.name,
    polygon: {
      type: 'Polygon',
      coordinates: [transformedCoordinates],
    },
    meridian: false,
  };
}
