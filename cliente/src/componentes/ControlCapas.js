import React from "react"; 
import { LayersControl } from "react-leaflet"; 

import '../estilos/ControlCapas.css';

const { BaseLayer, Overlay } = LayersControl;

const ControlCapas = ({ children }) => {
  return (
    <LayersControl position="topleft" collapsed={false}>
      {children}
    </LayersControl>
  );
};

ControlCapas.BaseLayer = BaseLayer;
ControlCapas.Overlay = Overlay;

export default ControlCapas;