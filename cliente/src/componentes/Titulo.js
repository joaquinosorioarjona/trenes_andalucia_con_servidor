import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import '../estilos/Titulo.css'; 

const ControlTitulo = ({ title, subtitle, autor }) => {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: 'topright' });

    control.onAdd = function () {
      const div = L.DomUtil.create('div', 'titulo-control leaflet-control leaflet-bar');
      div.innerHTML = `<div>${title}</div><div class="subtitle">${subtitle}</div><div class="autor">${autor}</div>`;
      return div;
    };

    control.addTo(map);

    return () => map.removeControl(control);
  }, [map, title, subtitle, autor]);

  return null;
};

export default ControlTitulo;