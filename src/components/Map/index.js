import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

//DATA EN DUR
import * as parkDate from "../../data/skateboard-parks.json";
// CSS MAPBOX
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ viewport, mapboxApiAccessToken, mapStyle, updateViewport }) => {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  const handleChange = mapChange => {
    console.log(mapChange);
    // event.preventDefault();
    // sendMessage();
    updateViewport(mapChange);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle={mapStyle}
        // Animation sur le changement :  Viewport Transition
        // https://urbica.github.io/react-map-gl/#/Components/Layer
        // https://github.com/uber/react-map-gl/blob/master/docs/advanced/viewport-transition.md#examples/viewport-animation
        // onViewportChange={viewport => {
        //   setViewport(viewport);
        //   console.log(viewport);
        // }}
        onViewportChange={handleChange}
      >
        {parkDate.features.map(park => (
          //ICI A VERIFIER PREFERER LAYER A MARKER
          //
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/public/DumpsterLogos.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
              <img src="/public/fox-715588__180.jpg" />
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
Map.propTypes = {
  viewport: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    // J'arrive pas a verfier le type de Height et Width car il change
    // width: PropTypes.number.isRequired,
    // height: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  mapStyle: PropTypes.string.isRequired,
  updateViewport: PropTypes.func.isRequired
};

export default Map;
