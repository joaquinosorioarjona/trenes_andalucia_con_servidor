import React from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import lineasData from '../datos/lineas_tren.json'; 

const CercaniasLayer = () => {
  const cercaniasLines = [
    'Línea Cercanías Cádiz', 
    'Línea Cercanías Córdoba', 
    'Línea Cercanías Málaga', 
    'Línea Cercanías Sevilla'
  ];

  const filterFeature = (feature) => cercaniasLines.includes(feature.properties.linea);

  const style = {
    color: '#FF0000',
    weight: 2, 
  };

  return (
    <GeoJSON data={lineasData} style={style} filter={filterFeature} />
  );
};

export default CercaniasLayer;