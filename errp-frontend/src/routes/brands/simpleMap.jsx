/* global google */

import React from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 8.745,
  lng: 40.523
};

function SimpleMap() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyABKNBV9xJdT4LM5QP_gwkDCqWTmU-5O7I"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(SimpleMap)