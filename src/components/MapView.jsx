import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../api/api';
import L from 'leaflet';

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resResources = await api.get('/resources');
        const resRequests = await api.get('/requests');
        setResources(resResources.data);
        setRequests(resRequests.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {resources.map(r => (
        <Marker
          key={r._id}
          position={[r.location.coordinates[1], r.location.coordinates[0]]}
        >
          <Popup>
            <strong>Resource:</strong> {r.type} <br />
            <strong>Quantity:</strong> {r.quantity} <br />
            <strong>Status:</strong> {r.status}
          </Popup>
        </Marker>
      ))}
      {requests.map(r => (
        <Marker
          key={r._id}
          position={[r.location.coordinates[1], r.location.coordinates[0]]}
        >
          <Popup>
            <strong>Request:</strong> {r.resourceType} <br />
            <strong>Quantity:</strong> {r.quantity} <br />
            <strong>Status:</strong> {r.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;