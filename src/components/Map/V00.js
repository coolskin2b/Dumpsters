import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
// Mapbox CSS https://docs.mapbox.com/mapbox-gl-js/overview/
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJSONLayer } from "react-mapbox-gl";

//import local
import "./map.scss";
import data from "../../data/geojson";
// Basé sur ce tutoriel
// https://medium.com/@julianne.marik/creating-a-mapbox-react-component-1314d2796b7

class Map extends React.Component {
  state = {
    // PROBLEME 1 Mauvais style chargé
    styleName: "mapbox/streets-v9",
    // on a fait le choix de stocker nos champs dans un objet
    accessToken:
      "pk.eyJ1IjoiY29vbHNraW4yYiIsImEiOiJjazFtaTBwZ3IwMHdqM3ByMGs1ZW42MjB5In0.4_OP7fER3iedwRMZqfDppg",
    zoomScale: "10",
    lon: 9.438076615333557,
    lat: 42.87966324871299
  };

  /* PROBLEME 1
  backend.js:6 Image "park-11" could not be loaded. Please make sure you have added 
  the image with map.addImage() or a "sprite" property in your style. 
  You can provide missing images by listening for the "styleimagemissing" map event.
  https://stackoverflow.com/questions/57913609/geojson-at-url-just-stopped-rendering-markers
  */

  componentDidMount() {
    // destructure the props passed in from the App component
    const { accessToken, styleName, lon, lat, zoomScale } = this.state;
    // const {accessToken, styleName, lon, lat, zoomScale} = this.props;
    //var Layer = ReactMapboxGl.Layer;
    //var Feature = ReactMapboxGl.Feature;
    ReactMapboxGl.accessToken = accessToken;

    this.map = new ReactMapboxGl.Map({
      container: "map", // html element id in render
      // Style du rendu de la Carte configurable sur le site MapBox
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat], // note: longitude comes before lattitude
      zoom: [zoomScale]
    });
    console.log(data);
  }

  render() {
    return <Map />;
  }
}

export default Map;

/*
*
* PREMIERE ESSAI
*
*
// ES6
import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

// ES5

// in render()
// https://alex3165.github.io/react-mapbox-gl/demos

const MapContainer = () => {
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiY29vbHNraW4yYiIsImEiOiJjazFtaTBwZ3IwMHdqM3ByMGs1ZW42MjB5In0.4_OP7fER3iedwRMZqfDppg',
  });
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{
        height: '50vh',
        width: '50vw',
      }}
      // permet d'indiquer l'emplacement de depart qu on doit recuperer de l'adress ou de la position
      center={[9.11865234375, 42.56926437219384]}
    >
      { Layer pour design Premiere Façon : https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers-symbol }
      <Layer
        type="circle"
        id="marker"
        paint={{
          'circle-color': '#ff5200',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
          'circle-stroke-opacity': 1,
        }}
      >
        <Feature coordinates={[9.11865234375, 42.56926437219384]} />
        <Feature coordinates={[9.11865234375, 43.56926437219384]} />
      </Layer>
    </Map>
  );
};

export default MapContainer;
*/
