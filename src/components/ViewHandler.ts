import { useMapEvents } from "react-leaflet";

export function ViewHandler() {
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

export function getInitialView() {
  const params = new URLSearchParams(window.location.search);

  const x = parseFloat(params.get("x") ?? "0");
  const y = parseFloat(params.get("y") ?? "0");
  const z = parseFloat(params.get("z") ?? "1");

  return { x, y, z };
}
