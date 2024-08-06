import React from 'react';
import axios from 'axios';

const BorrarDato = ({ id, onDeleteSuccess }) => {
  const handleDeleteClick = async () => {
    try {
      if (!id) {
        console.error('ID no definido');
        return;
      }

      if (window.confirm('¿Estás seguro de que quieres eliminar esta estación?')) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/estaciones/${id}`, {
          headers: {
            'Authorization': `Basic ${token}`
          }
        });
        onDeleteSuccess(id);
      }
    } catch (error) {
      console.error('Error al eliminar los datos:', error);
    }
  };

  return (
    <button onClick={handleDeleteClick}>
      Borrar
    </button>
  );
};

export default BorrarDato;

