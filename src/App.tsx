import { Heading } from "./components/Heading.tsx";
import { Map } from "./components/Map.tsx";

export function App() {
  return (
    <div
      style={{
        margin: "auto",
        position: "relative",
      }}
    >
      <Heading></Heading>
      <Map></Map>
    </div>
  );
}
