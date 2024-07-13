import { useEffect } from "react";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const TOKEN = "pk.eyJ1IjoibWFubmlsIiwiYSI6ImNseWd6MHBldzBlZGcya3M4MDYzN3JlcHQifQ.IvHX0_5yQZORPxytdTQyRQ";

const Geocoder = ({ setNewPlace, mapRef }) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();
    const geocoder = new MapBoxGeocoder({
      accessToken: TOKEN,
      marker: false,
      collapsed: true,
    });

    map.addControl(geocoder);

    geocoder.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setNewPlace({ lng: coords[0], lat: coords[1] });
      map.flyTo({
        center: coords,
        zoom: 16,
        pitch: 45,
      });
    });

    return () => {
      map.removeControl(geocoder);
    };
  }, [mapRef, setNewPlace]);

  return null;
};

export default Geocoder;
