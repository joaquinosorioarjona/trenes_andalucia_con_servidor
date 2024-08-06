import React, { useEffect, useState, useCallback } from 'react';
import { GeoJSON } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import CrearDato from './CrearDato';
import ActualizarDato from './ActualizarDato';
import BorrarDato from './BorrarDato'; 

import { createRoot } from 'react-dom/client';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const pointToLayer = (feature, latlng) => {
  return L.circleMarker(latlng, {
    radius: 4,
    fillColor: "#8B0000",
    color: "#000000",
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
  });
};

const EstacionesLayer = ({ selectedLine, latLng, isBufferActive, isRestoring, radius, addedPoints, setAddedPoints }) => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/estaciones');
      setGeojsonData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setGeojsonData({ features: [] });
    }
  }, []);

  const fetchBufferedData = useCallback(async (lat, lng) => {
    try {
      const radiusInMeters = radius * 1000;
      const response = await axios.get(`http://localhost:5000/estaciones/buffer?lat=${lat}&lng=${lng}&radius=${radiusInMeters}`);
      setGeojsonData(response.data);
    } catch (error) {
      console.error('Error fetching buffered data: ', error);
      setGeojsonData({ features: [] });
    }
  }, [radius]);

  useEffect(() => {
    if (isRestoring) {
      fetchData();
    } else if (isBufferActive && latLng) {
      fetchBufferedData(latLng.lat, latLng.lng);
    } else {
      fetchData();
    }
  }, [latLng, isBufferActive, isRestoring, radius, fetchData, fetchBufferedData]);

  useEffect(() => {
    if (addedPoints.length) {
      setGeojsonData(prevData => ({
        ...prevData,
        features: [
          ...prevData.features,
          ...addedPoints.map(point => ({
            type: 'Feature',
            geometry: point.geom,
            properties: {
              nombre: point.nombre,
              municipio: point.municipio,
              provincia: point.provincia,
              linea: point.linea,
              id: point.id,
            }
          }))
        ]
      }));
    }
  }, [addedPoints]);

  const handleEditClick = (feature) => {
    setSelectedFeature(feature);
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    setEditMode(false);
    await fetchData(); 
  };

  const handleClose = () => {
    setEditMode(false);
    setCreateMode(false);
    setSelectedFeature(null);
  };

  const handleCreateClick = (newPoint) => {
    setCreateMode(false);
    addNewPoint(newPoint);
  };

  const handleDeleteSuccess = (id) => {
    setSelectedFeature(null);
    setGeojsonData(prevData => ({
      ...prevData,
      features: prevData.features.filter(feature => feature.properties.id !== id)
    }));
    setAddedPoints(prevPoints => prevPoints.filter(point => point.id !== id));
  };

  const addNewPoint = (newPoint) => {
    setGeojsonData(prevData => ({
      ...prevData,
      features: [...prevData.features, newPoint]
    }));
    setAddedPoints(prevPoints => [...prevPoints, newPoint]);
  };

  const onEachFeature = (feature, layer) => {
    layer.on('click', () => {
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
        <div>
          <b>${feature.properties.nombre}</b><br>
          Municipio: ${feature.properties.municipio}<br>
          Provincia: ${feature.properties.provincia}<br>
          Línea: ${feature.properties.linea}<br>
          <button id="edit-button">Editar</button>
        </div>
      `;
      layer.bindPopup(popupContent).openPopup();

      popupContent.querySelector('#edit-button').addEventListener('click', () => {
        handleEditClick(feature);
      });

      const deleteButtonContainer = document.createElement('div');
      popupContent.appendChild(deleteButtonContainer);

      const root = createRoot(deleteButtonContainer);
      root.render(
        <BorrarDato id={feature.properties.id} onDeleteSuccess={() => handleDeleteSuccess(feature.properties.id)} />
      );
    });
  };

  if (!geojsonData || !geojsonData.features) {
    return null;
  }

  const filteredData = geojsonData.features.filter((feature) => {
    if (selectedLine === 'Todos') return true;
    return feature.properties.linea === selectedLine;
  });

  const allData = {
    type: 'FeatureCollection',
    features: [
      ...filteredData,
      ...addedPoints.map(point => ({
        type: 'Feature',
        geometry: point.geom,
        properties: {
          nombre: point.nombre,
          municipio: point.municipio,
          provincia: point.provincia,
          linea: point.linea,
          id: point.id,
        }
      }))
    ]
  };

  return (
    <>
      <GeoJSON
        key={JSON.stringify(allData.features)}
        data={allData}
        pointToLayer={pointToLayer}
        onEachFeature={onEachFeature}
      />
      {editMode && selectedFeature && (
        <div className="edit-popup-container">
          <ActualizarDato
            feature={selectedFeature}
            onClose={handleClose}
            onSave={handleSaveClick}
          />
        </div>
      )}
      {createMode && (
        <div className="create-popup-container">
          <CrearDato
            onSave={handleCreateClick}
            onClose={() => setCreateMode(false)}
            latLng={latLng}
          />
        </div>
      )}
    </>
  );
};

export default EstacionesLayer;



