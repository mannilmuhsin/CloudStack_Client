import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFubmlsIiwiYSI6ImNseWd6MHBldzBlZGcya3M4MDYzN3JlcHQifQ.IvHX0_5yQZORPxytdTQyRQ';

function SearchBar({ onSelectLocation }) {
  const geocoderContainerRef = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a location',
    });

    geocoder.addTo(geocoderContainerRef.current);

    geocoder.on('result', (e) => {
      onSelectLocation(e.result);
    });

    return () => {
      geocoder.onRemove();
    };
  }, [onSelectLocation]);

  return <div ref={geocoderContainerRef} className="mb-4"></div>;
}

export default SearchBar;