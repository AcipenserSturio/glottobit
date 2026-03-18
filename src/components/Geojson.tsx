import L from "leaflet";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

export interface GeojsonProps {
  path: string;
}

export function Geojson({ path }: GeojsonProps) {
  const [geojson, setGeojson] = useState();
  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((json) => setGeojson(json))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  const handleClickFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const content = `
        <div>
          <strong>${feature.properties.name}</strong><br/>
          ${feature.properties.description || ""}
        </div>
      `;

      layer.bindPopup(content);

      layer.on({
        click: () => {
          layer.openPopup();
        },
      });
    }
  };

  return (
    <>
      {geojson && (
        <GeoJSON
          data={geojson}
          pointToLayer={(_, latlng) => {
            return L.circleMarker(latlng, {
              radius: 5,
              fillColor: "#777",
              color: "#000",
              weight: 1,
              opacity: 0.5,
              fillOpacity: 0.2,
            });
          }}
          style={() => ({
            color: "#333",
            weight: 2,
            opacity: 0.8,
            fillColor: "#333",
            fillOpacity: 0,
          })}
          onEachFeature={handleClickFeature}
        />
      )}
    </>
  );
}
