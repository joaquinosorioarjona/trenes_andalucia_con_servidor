import React, { useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapData from '../datos/provincias.json'; 

const ProvinciasLayer = () => { 
  useEffect(() => { 
    console.log('Datos GeoJSON:', mapData);  
  }, []);  

  const style = {
    color: '#333',
    weight: 2,
    fillOpacity: 0
  };

  return mapData ? <GeoJSON data={mapData} style={style} /> : null;
}; 

export default ProvinciasLayer;