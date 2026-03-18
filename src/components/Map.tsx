import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import { Geojson } from "./Geojson";
import { HoverUI } from "./HoverUI";
import "./Map.css";
import { getInitialView, ViewHandler } from "./ViewHandler";

export function Map() {
  const initialView = getInitialView();
  return (
    <MapContainer
      crs={L.CRS.EPSG4326}
      center={[initialView.x, initialView.y]}
      zoom={initialView.z}
      minZoom={0.5}
      maxZoom={10}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ViewHandler></ViewHandler>
      <HoverUI></HoverUI>
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
    </MapContainer>
  );
}
