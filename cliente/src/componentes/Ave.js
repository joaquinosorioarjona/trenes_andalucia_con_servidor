import React from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import lineasData from '../datos/lineas_tren.json'; 

const AltaVelocidadLayer = () => {
  const aveLines = [
    'Línea de Alta Velocidad Española', 
    'Línea de Alta velocidad en vía internacional y ancha'
  ];

  const filterAndSortFeatures = (features) => {
    const filteredFeatures = features.filter(feature => aveLines.includes(feature.properties.linea));

    filteredFeatures.sort((a, b) => {
      if (a.properties.linea === 'Línea de Alta Velocidad Española') return 1;
      if (b.properties.linea === 'Línea de Alta Velocidad Española') return -1;
      return 0;
    });

    return filteredFeatures;
  };

  const style = (feature) => {
    if (feature.properties.linea === 'Línea de Alta Velocidad Española') {
      return {
        color: '#00008B', 
        weight: 7,        
      };
    }
    if (feature.properties.linea === 'Línea de Alta velocidad en vía internacional y ancha') {
      return {
        color: '#6c878f', 
        weight: 5,        
      };
    }
    return {};
  };

  const sortedFeatures = filterAndSortFeatures(lineasData.features);

  return (
    <GeoJSON data={{ ...lineasData, features: sortedFeatures }} style={style} />
  );
};

export default AltaVelocidadLayer;