import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const CercaniasLayer = () => {
  const [lineasData, setLineasData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/lineas')
      .then(response => setLineasData(response.data))
      .catch(error => console.error('Error fetching lineas data:', error));
  }, []);

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

  if (!lineasData) return null;

  return (
    <GeoJSON 
      data={{ 
        ...lineasData, 
        features: lineasData.features.filter(filterFeature) 
      }} 
      style={style} 
    />
  );
};

export default CercaniasLayer;