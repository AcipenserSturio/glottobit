export function Heading() {
  return (
    <div
      style={{
        zIndex: 1000,
        position: "absolute",
        right: "15px",
        top: "15px",
        margin: 0,
        padding: "15px",
        fontFamily: "Noto Serif",
        fontSize: "80%",
        textAlign: "right",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "0 0 3px black",
        opacity: "0.85",
      }}
    >
      <h1 style={{ margin: 0 }}>Glottobit</h1>
      <p style={{ margin: 0 }}>(demo)</p>
    </div>
  );
}
