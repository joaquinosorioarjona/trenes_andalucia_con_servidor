import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import ControlTitulo from './Titulo';
import Norte from './Norte';
import Leyenda from './Leyenda';
import ControlEscala from './Escala';
import ControlCapas from './ControlCapas';

import Filtro from './Filtro';
import Buffer from './Buffer';
import CrearDato from './CrearDato'; 
import Autentificacion from './Autentificacion'; 
import Popups from './Popups';

import EstacionesLayer from './EstacionesPostgis';
import AltaVelocidadLayer from './AvePostgis';
import MediaDistanciaLayer from './MediadistanciaPostgis';
import CercaniasLayer from './CercaniasPostgis';
import ProvinciasLayer from './ProvinciasPostgis';

import '../estilos/Mapa.css'; 
import '../estilos/Cursor.css'; 

const Mapa = () => {
  const [selectedLine, setSelectedLine] = useState('Todos');
  const [latLng, setLatLng] = useState(null);
  const [isBufferActive, setIsBufferActive] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [radius, setRadius] = useState(50); 
  const [isAdding, setIsAdding] = useState(false); 
  const [tempLatLng, setTempLatLng] = useState(null); 
  const [addedPoints, setAddedPoints] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('viewer'); 

  useEffect(() => {
    if (isAdding || isBufferActive) {
      document.querySelector('.leaflet-container').classList.add('red-circle-cursor');
    } else {
      document.querySelector('.leaflet-container').classList.remove('red-circle-cursor');
    }
  }, [isAdding, isBufferActive]);

  const handleMapClick = (e) => {
    if (isAdding) {
      setTempLatLng(e.latlng); 
      setIsAdding(false); 
    } else if (isBufferActive) {
      setLatLng(e.latlng);
    }
  };

  const handleActivateButtonClick = () => {
    setIsBufferActive(true);
    setIsRestoring(false);
  };

  const handleRestoreButtonClick = () => {
    setIsBufferActive(false);
    setIsRestoring(true);
  };

  const MapEventHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
    setTempLatLng(null); 
  };

  const handleSaveForm = (data) => {
    setAddedPoints(prevPoints => [
      ...prevPoints,
      {
        nombre: data.nombre,
        municipio: data.municipio,
		provincia: data.provincia,
        linea: data.linea,
        geom: {
          type: "Point",
          coordinates: [tempLatLng.lng, tempLatLng.lat], 
        },
        id: data.id,  
      }
    ]);
    setIsAdding(false);
    setTempLatLng(null); 
  };
  
  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('viewer');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };


  return (
    <>
      <MapContainer
        center={[37.15, -4.65]}
        zoom={8}
        style={{ height: '910px', width: '100%' }}
      >
        <ControlTitulo
          title="La red ferroviaria de Andalucía en la actualidad"
          subtitle="El desmantelamiento de la red de Media Distancia y la simplificación por el AVE"
          autor="Autor: Joaquín Osorio Arjona (Doctor en Geografía, Profesor en la UNED)"
        />

        <ControlCapas>
          <ControlCapas.BaseLayer checked name="ArcGIS fondo claro">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, USGS, NOAA'
            />
          </ControlCapas.BaseLayer>

          <ControlCapas.BaseLayer name="ArcGIS fondo oscuro">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, USGS, NOAA'
            />
          </ControlCapas.BaseLayer>

          <ControlCapas.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </ControlCapas.BaseLayer>

          <ControlCapas.Overlay checked name="Estaciones">
            <EstacionesLayer 
              selectedLine={selectedLine} 
              latLng={latLng} 
              isBufferActive={isBufferActive} 
              isRestoring={isRestoring} 
              radius={radius}
              addedPoints={addedPoints} 
              setAddedPoints={setAddedPoints}
            />
          </ControlCapas.Overlay>

          <ControlCapas.Overlay name="AVE">
            <AltaVelocidadLayer />
          </ControlCapas.Overlay>

          <ControlCapas.Overlay checked name="Media Distancia">
            <MediaDistanciaLayer />
          </ControlCapas.Overlay>

          <ControlCapas.Overlay name="Cercanías">
            <CercaniasLayer />
          </ControlCapas.Overlay>

          <ControlCapas.Overlay name="Provincias">
            <ProvinciasLayer />
          </ControlCapas.Overlay>
        </ControlCapas>

        <Popups />
        <ControlEscala />
        <Leyenda />
        <Norte />

        <Filtro selectedLine={selectedLine} onChange={setSelectedLine} />

        <MapEventHandler />

        <Buffer
          latLng={latLng}
          radius={radius}
          setRadius={setRadius}
          handleActivateButtonClick={handleActivateButtonClick}
          handleRestoreButtonClick={handleRestoreButtonClick}
          isBufferActive={isBufferActive} 
        />

        {/* Botón de añadir estación */}
        <button
          className="add-button"
          onClick={handleAddButtonClick}
        >
          Añadir Estación
        </button>

        {/* Mostrar el marcador temporal */}
        {tempLatLng && (
          <Marker
            position={tempLatLng}
            icon={L.divIcon({
              className: 'temp-marker',
              html: '<div class="temp-marker-circle"></div>',
              iconSize: [10, 10],
            })}
          >
            <Popup>
              <CrearDato
                latLng={tempLatLng}
                onClose={handleCloseForm}
                onSave={handleSaveForm}
              />
            </Popup>
          </Marker>
        )}
		
	   <Autentificacion 
          isAuthenticated={isAuthenticated}
          role={role}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

      </MapContainer>
    </>
  );
};

export default Mapa;

