import React from 'react';
import '../estilos/Filtro.css';

const Filtro = ({ selectedLine, onChange }) => {
  const lines = [
    "Todos", 
    "Alta Velocidad Española", 
    "Alta Velocidad en vía internacional y ancha", 
    "Media Distancia A1 Sevilla-Cádiz", 
    "Media Distancia A2 Sevilla-Córdoba-Jaén",
    "Media Distancia A3 Sevilla-Granada-Almería", 
    "Media Distancia A3B Sevilla-Málaga", 
    "Media Distancia A4 Córdoba-Bobadilla", 
    "Media Distancia A5 Algeciras-Granada",
    "Media Distancia A6 Granada-Linares", 
    "Media Distancia A7 Sevilla-Huelva-Zafra", 
    "Media Distancia A8 Sevilla-Mérida", 
    "Media Distancia Madrid-Linares-Jaén",
    "Cercanías Sevilla", 
    "Cercanías Málaga", 
    "Cercanías Cádiz", 
    "Cercanías Córdoba"
  ];

  return (
    <div className="filter-container">
      <label htmlFor="line-filter" className="filter-title">Filtrar estaciones por línea:</label>
      <select id="line-filter" name="line-filter" value={selectedLine} onChange={(e) => onChange(e.target.value)}>
        {lines.map((line) => (
          <option key={line} value={line}>{line}</option>
        ))}
      </select>
    </div>
  );
};

export default Filtro;
