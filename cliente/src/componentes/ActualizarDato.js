import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/ActualizarDato.css';

const ActualizarDato = ({ feature, onClose, onSave }) => {
  const [editData, setEditData] = useState({
    nombre: feature.properties.nombre || '',
    municipio: feature.properties.municipio || '',
    provincia: feature.properties.provincia || '',
    linea: feature.properties.linea || '',
    geom: feature.geometry || { type: "Point", coordinates: [] }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGeomChange = (e) => {
    const { value } = e.target;
    const coordinates = value.split(',').map(coord => parseFloat(coord.trim()));
    setEditData(prevState => ({
      ...prevState,
      geom: {
        ...prevState.geom,
        coordinates: coordinates
      }
    }));
  };

  const handleSaveClick = async () => {
    try {
      if (!editData.nombre || !editData.municipio || !editData.provincia || !editData.linea || !editData.geom.coordinates.length) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/estaciones/${feature.properties.id}`, editData, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      onSave();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <div className="update-data-container">
      <h3>Editar Estación</h3>
      <label>
        Nombre:
        <input type="text" name="nombre" value={editData.nombre} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Municipio:
        <input type="text" name="municipio" value={editData.municipio} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Provincia:
        <input type="text" name="provincia" value={editData.provincia} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Línea:
        <input type="text" name="linea" value={editData.linea} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Coordenadas (lat, lng):
        <input type="text" name="coordinates" value={editData.geom.coordinates.join(', ')} onChange={handleGeomChange} />
      </label>
      <br />
      <button onClick={handleSaveClick}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ActualizarDato;