'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- CONFIGURATION SOUVERAINE DES ICÔNES ---
// Utilisation des assets locaux (public/leaflet)
const defaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// --- SUB-COMPONENT: MAP CONTROLLER ---
// Gère l'invalidation de la taille lors du montage (Fix Grid Layout)
const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Force un recalcul de la taille du conteneur Leaflet
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

// Données Stratégiques Simulées
const TARGETS = [
  { id: 1, lat: 48.8566, lng: 2.3522, name: "PARIS_NODE_01", status: "ACTIVE" },
  { id: 2, lat: 18.0735, lng: -15.9582, name: "NOUAKCHOTT_HQ", status: "SECURE" },
  { id: 3, lat: 40.7128, lng: -74.0060, name: "NY_RELAY", status: "WARNING" },
  { id: 4, lat: 34.0522, lng: -118.2437, name: "LA_LINK", status: "OFFLINE" }
];

export default function GlobalMap() {
  return (
    <div className="h-full w-full bg-black/50 border border-green-900/30 rounded overflow-hidden relative">
      <div className="absolute top-2 right-2 z-[1000] bg-black/80 text-green-500 text-[10px] px-2 py-1 border border-green-900 rounded">
        [EXTERNAL_STREAM] CARTO_DB
      </div>
      
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", background: "#050505" }}
        zoomControl={false}
      >
        <MapController />
        
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {TARGETS.map(target => (
          <Marker key={target.id} position={[target.lat, target.lng]} icon={defaultIcon}>
            <Popup className="leaflet-popup-dark">
              <div className="font-mono text-xs">
                <strong className="text-green-600">{target.name}</strong><br/>
                STATUS: {target.status}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}