import { useEffect, useMemo, useState } from "react";
import { ImageOverlay } from "react-leaflet";

export function BitmapOverlay() {
  const [overlayKey, setOverlayKey] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "r") {
        setOverlayKey((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const imageUrl = useMemo(
    () => `/glottobit/demo.png?v=${overlayKey}`,
    [overlayKey],
  );

  return (
    <ImageOverlay
      key={overlayKey}
      url={imageUrl}
      bounds={[
        [-90, -180],
        [90, 180],
      ]}
      opacity={0.9}
    />
  );
}
