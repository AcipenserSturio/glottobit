import { useState } from "react";
import { useMapEvents } from "react-leaflet";

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

export function HoverUI() {
  const [cursorLat, setCursorLat] = useState(0);
  const [cursorLng, setCursorLng] = useState(0);

  function updateCursor(lat: number, lng: number) {
    setCursorLat(lat);
    setCursorLng(lng);
  }

  return (
    <>
      <CursorTracker setPosition={updateCursor} />

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
    </>
  );
}
