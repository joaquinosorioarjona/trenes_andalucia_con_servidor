import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MediaDistanciaLayer = () => {
  const [lineasData, setLineasData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/lineas')
      .then(response => setLineasData(response.data))
      .catch(error => console.error('Error fetching lineas data:', error));
  }, []);

  const mediaDistanciaLines = [
    'Línea Media Distancia A1 Sevilla-Cádiz',
    'Línea Media Distancia A2 Sevilla-Córdoba-Jaén',
    'Línea Media Distancia A3 Sevilla-Granada-Almería',
    'Línea Media Distancia A3B Sevilla-Málaga',
    'Línea Media Distancia A4 Córdoba-Bobadilla',
    'Línea Media Distancia A5 Algeciras-Granada',
    'Línea Media Distancia A6 Granada-Linares',
    'Línea Media Distancia A7 Sevilla-Huelva-Zafra',
    'Línea Media Distancia A8 Sevilla-Mérida',
    'Línea Media Distancia Madrid-Linares-Jaén'
  ];

  const colors = {
    'Línea Media Distancia A1 Sevilla-Cádiz': '#287d6a', 
    'Línea Media Distancia A2 Sevilla-Córdoba-Jaén': '#064f8c', 
    'Línea Media Distancia A3 Sevilla-Granada-Almería': '#f6ab4e', 
    'Línea Media Distancia A3B Sevilla-Málaga': '#d8c32f', 
    'Línea Media Distancia A4 Córdoba-Bobadilla': '#4b5284', 
    'Línea Media Distancia A5 Algeciras-Granada': '#c4849f', 
    'Línea Media Distancia A6 Granada-Linares': '#3c1342', 
    'Línea Media Distancia A7 Sevilla-Huelva-Zafra': '#a52263', 
    'Línea Media Distancia A8 Sevilla-Mérida': '#2189bc', 
    'Línea Media Distancia Madrid-Linares-Jaén': '#70787b', 
  };

  const filterAndSortFeatures = (features) => {
    const filteredFeatures = features.filter(feature => mediaDistanciaLines.includes(feature.properties.linea));

    filteredFeatures.sort((a, b) => mediaDistanciaLines.indexOf(b.properties.linea) - mediaDistanciaLines.indexOf(a.properties.linea));

    return filteredFeatures;
  };

  const style = (feature) => ({
    color: colors[feature.properties.linea] || '#000000', 
    weight: 3, 
  });

  if (!lineasData) return null; // Espera hasta que los datos estén disponibles

  const sortedFeatures = filterAndSortFeatures(lineasData.features);

  return (
    <GeoJSON data={{ ...lineasData, features: sortedFeatures }} style={style} />
  );
};

export default MediaDistanciaLayer;