import React, { useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import mapData from '../datos/estaciones_tren.json'; 

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
		fillOpacity: 1
	});
};

const popup = (feature, layer) => { 
	if (feature.properties && feature.properties.nombre && feature.properties.municipio && feature.properties.linea) { 
		const popupContent = `
			<b>${feature.properties.nombre}</b><br>
			Municipio: ${feature.properties.municipio}<br>
			Linea: ${feature.properties.linea}
		`;
		layer.bindPopup(popupContent); 
	}
};

const EstacionesLayer = ({ selectedLine }) => {
	useEffect(() => {
	}, [selectedLine]);

	const filteredData = mapData.features.filter(feature => {
		if (selectedLine === 'Todos') return true;
		return feature.properties.linea === selectedLine;
	});

	return (
		<GeoJSON 
			key={selectedLine} 
			data={{ type: 'FeatureCollection', features: filteredData }} 
			pointToLayer={pointToLayer} 
			onEachFeature={popup} 
		/>
	);
};

export default EstacionesLayer;