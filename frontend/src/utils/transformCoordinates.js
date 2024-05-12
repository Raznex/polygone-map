export function transformCoordinatesToArray(coordinates) {
  return coordinates.map((coord) => {
    const [latitude, longitude] = coord.split(',').map(parseFloat);
    return [latitude, longitude];
  });
}

export function transformCoordinatesToString(coordinates) {
  const transformedCoordinates = [];

  coordinates.forEach((coordinates) => {
    coordinates.forEach((coord) => {
      const [latitude, longitude] = coord;
      transformedCoordinates.push(`${latitude},${longitude}`);
    });
  });

  return transformedCoordinates;
}
