import React, { useEffect } from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';

import '../estilos/Buffer.css';

const Buffer = ({ latLng, radius, setRadius, handleActivateButtonClick, handleRestoreButtonClick, isBufferActive }) => {
  useEffect(() => {
    if (isBufferActive) {
      document.querySelector('.leaflet-container').classList.add('red-circle-cursor');
    } else {
      document.querySelector('.leaflet-container').classList.remove('red-circle-cursor');
    }
  }, [isBufferActive]);

  return (
    <div className="buffer-form">
      <FormGroup>
        <Label for="latitud"><strong>Latitud:</strong></Label>
        <Input type="text" id="latitud" value={latLng ? latLng.lat.toFixed(6) : ''} readOnly />
      </FormGroup>
      <FormGroup>
        <Label for="longitud"><strong>Longitud:</strong></Label>
        <Input type="text" id="longitud" value={latLng ? latLng.lng.toFixed(6) : ''} readOnly />
      </FormGroup>
      <FormGroup>
        <Label for="radio"><strong>Radio (km):</strong></Label>
        <Input 
          type="number" 
          id="radio" 
          value={radius} 
          onChange={(e) => setRadius(Number(e.target.value))} 
          min="0" 
        />
      </FormGroup>
      <Button color="primary" onClick={handleActivateButtonClick}>Activar</Button>
      <Button color="secondary" onClick={handleRestoreButtonClick}>Restaurar</Button>
    </div>
  );
};

export default Buffer;

