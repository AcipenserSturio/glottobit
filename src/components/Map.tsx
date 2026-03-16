import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./Map.css";

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

      <TileLayer
        url="https://tile.gbif.org/4326/omt/{z}/{x}/{y}@1x.png"
        attribution="© GBIF / OpenMapTiles"
      />

      <ImageOverlay
        url="/glottobit/demo.png"
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        opacity={0.9}
      />
    </MapContainer>
  );
}
