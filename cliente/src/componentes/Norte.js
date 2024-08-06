import React from 'react';
import 'leaflet/dist/leaflet.css';
import '../estilos/Norte.css'; 

const Norte = () => {
  return (
    <div className="north-arrow-container">
      <div className="north-arrow">
        <div className="north-label">N</div>
      </div>
    </div>
  );
};

export default Norte;