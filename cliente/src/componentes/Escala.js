import React from "react"; 
import { ScaleControl } from "react-leaflet"; 

const ControlEscala = () => { 
	return <ScaleControl imperial={false} metric={true} position="bottomleft" />; 
}; 

export default ControlEscala;