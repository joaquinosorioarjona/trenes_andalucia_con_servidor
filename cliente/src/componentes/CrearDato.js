import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/CrearDato.css';

const CrearDato = ({ onClose, onSave, latLng }) => {
  const [nombre, setNombre] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [provincia, setProvincia] = useState('');
  const [linea, setLinea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre,
      municipio,
      provincia,
      linea,
      geom: {
        type: "Point",
        coordinates: [latLng.lng, latLng.lat]
      }
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/estaciones', data, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      onSave({ ...data, id: response.data.id });
      onClose();
    } catch (error) {
      console.error('Error al agregar el dato:', error);
    }
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <h2>Agregar Nueva Estación</h2>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Municipio:
          <input
            type="text"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            required
          />
        </label>
        <label>
          Provincia:
          <input
            type="text"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            required
          />
        </label>
        <label>
          Línea:
          <input
            type="text"
            value={linea}
            onChange={(e) => setLinea(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearDato;
