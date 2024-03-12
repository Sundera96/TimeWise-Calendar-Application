import "../css/toggleButton.css";

export default function ToggleButton({ onClick, isActive }) {
  return (
    <div className="toggle-button-container">
      <p>Month:</p>
      <div
        className={`toggle-button ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="slider"></div>
      </div>
    </div>
  );
}
