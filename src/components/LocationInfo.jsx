import React from 'react';

function LocationInfo({ location }) {
  if (!location) return null;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-2">{location.place_name}</h3>
      <p>Longitude: {location.center[0]}</p>
      <p>Latitude: {location.center[1]}</p>
    </div>
  );
}

export default LocationInfo;