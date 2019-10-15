import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "../../data/skateboard-parks.json";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({
  latitude,
  longitude,
  width,
  height,
  zoom,
  mapboxApiAccessToken,
  mapStyle
}) => {
  //Ancien HOOK pour le state
  // const [viewport, setViewport] = useState({
  //   latitude: 45.4211,
  //   longitude: -75.6903,
  //   width: "100vw",
  //   height: "100vh",
  //   zoom: 10
  // });
  const [selectedPark, setSelectedPark] = useState(null);

  //hook d'event sur la touche echap
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

  return (
    <div>
      <ReactMapGL
        latitude={latitude}
        longitude={longitude}
        width={width}
        zoom={zoom}
        height={height}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle={mapStyle}

        //Hook je sais pas trop a quoi il peut servir il actualise l'ancien state
        // onViewportChange={viewport => {
        //   setViewport(viewport);
        // }}
      >
        {parkDate.features.map(park => (
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

export default Map;
