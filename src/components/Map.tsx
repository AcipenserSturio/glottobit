import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";

export function Map() {
  return (
    <MapContainer
      crs={L.CRS.EPSG4326}
      center={[0, 0]}
      zoom={1}
      minZoom={0.5}
      maxZoom={10}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <TileLayer
        url="https://tile.gbif.org/4326/omt/{z}/{x}/{y}@1x.png"
        attribution="© GBIF / OpenMapTiles"
      />

      <ImageOverlay
        url="/demo.png"
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        opacity={0.9}
      />
    </MapContainer>
  );
}
