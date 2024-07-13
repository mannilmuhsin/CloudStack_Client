import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import api from '../utils/api';
import SearchBar from './SearchBar';
import MarkerIcon from './MarkerIcon'; 
import ModalDropdown from './ModalDropdown';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFubmlsIiwiYSI6ImNseWd6MHBldzBlZGcya3M4MDYzN3JlcHQifQ.IvHX0_5yQZORPxytdTQyRQ';

function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 11.24999,
    longitude:  75.83933,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await api.getSearchHistory();
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleSelectLocation = useCallback(async (result) => {
    setSelectedLocation(result);

    setViewport({
      ...viewport,
      latitude: result.center[1],
      longitude: result.center[0],
      zoom: 12,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    });

    try {
      await api.addSearchHistory(result.place_name, result.center[1], result.center[0]);
      fetchSearchHistory();
      // const imagesResponse = await api.getLocationImages(result.center);
      // setLocationImages(imagesResponse.data);
    } catch (error) {
      console.error('Error handling location selection:', error);
    }
  }, [viewport]);

  const handleSelectHistoryItem = async (item) => {
    // console.log(item);
    setSelectedLocation(item);

    setViewport({
      ...viewport,
      latitude: item.latitude,
      longitude: item.longitude,
      zoom: 12,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator()
    });

    try {
      // const imagesResponse = await api.getLocationImages([item.longitude, item.latitude]);
      // setLocationImages(imagesResponse.data);

    } catch (error) {
      console.error('Error handling history selection:', error);
    }
  };


  const handleDeleteHistoryItem = async (id) => {
    try {
      await api.deleteSearchHistory(id);
      fetchSearchHistory();
    } catch (error) {
      console.error('Error deleting search history item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <SearchBar onSelectLocation={handleSelectLocation} /> */}
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSelectLocation={handleSelectLocation} />
        <ModalDropdown 
          history={searchHistory} 
          onSelectItem={handleSelectHistoryItem} 
          onDeleteItem={handleDeleteHistoryItem} 
        />
      </div>
      <div className="h-[600px] w-full mb-4 rounded shadow-lg">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(newViewport) => setViewport(newViewport)}
        >
          {selectedLocation  && (
            <Marker
              latitude={selectedLocation.latitude || selectedLocation.center[1]}
              longitude={selectedLocation.longitude || selectedLocation.center[0]}
            >
              <MarkerIcon />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default MapPage;
