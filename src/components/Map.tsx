import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Geojson } from "./Geojson";
import "./Map.css";

function CursorTracker({
  setPosition,
}: {
  setPosition: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    mousemove(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function MapUrlSync() {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      const zoom = map.getZoom();

      const params = new URLSearchParams(window.location.search);

      params.set("x", center.lat.toFixed(5));
      params.set("y", center.lng.toFixed(5));
      params.set("z", zoom.toString());

      const newUrl = window.location.pathname + "?" + params.toString();

      window.history.replaceState({}, "", newUrl);
    },
  });

  return null;
}

function getInitialView() {
  const params = new URLSearchParams(window.location.search);

  const x = parseFloat(params.get("x") ?? "0");
  const y = parseFloat(params.get("y") ?? "0");
  const z = parseFloat(params.get("z") ?? "1");

  return { x, y, z };
}

export function Map() {
  const initial = getInitialView();
  const [cursorLat, setCursorLat] = useState(0);
  const [cursorLng, setCursorLng] = useState(0);
  // console.log(geojson);

  function updateCursor(lat: number, lng: number) {
    setCursorLat(lat);
    setCursorLng(lng);
  }

  return (
    <MapContainer
      crs={L.CRS.EPSG4326}
      center={[initial.x, initial.y]}
      zoom={initial.z}
      minZoom={0.5}
      maxZoom={10}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MapUrlSync />
      <CursorTracker setPosition={updateCursor} />

      <TileLayer
        url="https://tile.gbif.org/4326/omt/{z}/{x}/{y}@1x.png"
        attribution="© GBIF / OpenMapTiles"
      />

      <Geojson path="/glottobit/languages.geojson"></Geojson>
      {/*<Geojson path="/glottobit/geoBoundaries-BLR-ADM2_simplified.geojson"></Geojson>*/}
      {/*<Geojson path="/glottobit/geoBoundaries-BLR-ADM2_simplified.geojson"></Geojson>*/}

      <ImageOverlay
        url="/glottobit/demo.png"
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        opacity={0.9}
      />

      {/* UI overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "6px 10px",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "13px",
          zIndex: "1000",
        }}
      >
        lat: {cursorLat.toFixed(5)} <br />
        lng: {cursorLng.toFixed(5)}
      </div>
    </MapContainer>
  );
}
