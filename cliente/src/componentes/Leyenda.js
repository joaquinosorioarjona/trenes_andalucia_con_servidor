import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../estilos/Leyenda.css'; 

const Leyenda = () => {
  const map = useMap();

  React.useEffect(() => {
    const legend = L.control({ position: 'topright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <h4>Líneas de tren en Andalucía</h4>
        <i class="color-ave"></i> AVE<br>
        <i class="color-alvia"></i> ALVIA<br>
        <i class="color-media-distancia-a1"></i> Media Distancia A1 Sevilla-Cádiz<br>
        <i class="color-media-distancia-a2"></i> Media Distancia A2 Sevilla-Córdoba-Jaén<br>
        <i class="color-media-distancia-a3"></i> Media Distancia A3 Sevilla-Granada-Almería<br>
        <i class="color-media-distancia-a3b"></i> Media Distancia A3B Sevilla-Málaga<br>
        <i class="color-media-distancia-a4"></i> Media Distancia A4 Córdoba-Bobadilla<br>
        <i class="color-media-distancia-a5"></i> Media Distancia A5 Algeciras-Granada<br>
        <i class="color-media-distancia-a6"></i> Media Distancia A6 Granada-Linares<br>
        <i class="color-media-distancia-a7"></i> Media Distancia A7 Sevilla-Huelva-Zafra<br>
        <i class="color-media-distancia-a8"></i> Media Distancia A8 Sevilla-Mérida<br>
        <i class="color-media-distancia-madrid-linares-jaen"></i> Media Distancia Madrid-Linares-Jaén<br>
        <i class="color-cercanias"></i> Cercanías<br>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default Leyenda;