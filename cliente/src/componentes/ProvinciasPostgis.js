import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const ProvinciasLayer = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/provincias');
        setGeojsonData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const style = {
    color: '#333',
    weight: 2,
    fillOpacity: 0 
  };

  return geojsonData ? <GeoJSON data={geojsonData} style={style} /> : null;
};

export default ProvinciasLayer;