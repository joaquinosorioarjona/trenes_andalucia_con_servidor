import React from "react"; 
import { Marker, Popup } from "react-leaflet"; 

import santajusta from '../imagenes/santajusta.jpg'; 

import L from 'leaflet'; 
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'; 
import markerIcon from 'leaflet/dist/images/marker-icon.png'; 
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; 
delete L.Icon.Default.prototype._getIconUrl; 

L.Icon.Default.mergeOptions({ 
	iconUrl: markerIcon, 
	iconRetinaUrl: markerIcon2x, 
	shadowUrl: markerShadow, 
}) 

const Popups = () => { 
	return <Marker position={[37.3922422036603, -5.975281017358207]}> 
			<Popup> 
			<h2> Estación de Sevilla Santa Justa </h2> 
			<p> Es la principal estación ferroviaria de Sevilla. Fue inaugrada el 2 de mayo de 1991. Su apertura supuso la unión de los servicios de las históricas estaciones de Plaza de Armas (o estación de Córdoba) y de San Bernardo (o estación de Cádiz). Es la tercera estación de España, con un volumen de viajeros cercano a los 13 millones anuales de los cuales alrededor de 7 millones se corresponden con el tráfico de cercanías.  </p> 
			<img src={santajusta} alt="Descripción de la imagen" style={{ width: "100%", height: "auto" }} />
			</Popup> 
		</Marker>; 
}; 

export default Popups;