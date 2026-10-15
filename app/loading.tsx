export default function Loading() {
  return (
    <div className="intro-screen intro-loading" style={{ position: "fixed", inset: 0, zIndex: 2147483647, display: "grid", placeItems: "center", background: "var(--background, #0a0a0a)" }} role="status" aria-label="Murakaza neza">
      <div className="intro-panel intro-panel-left" />
      <div className="intro-panel intro-panel-right" />
      <span className="intro-title">Murakaza neza<span>.</span></span>
    </div>
  );
}
