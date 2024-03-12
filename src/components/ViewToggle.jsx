import "../css/viewToggle.css";
export default function ViewToggle({ isMonthView, onChange }) {
  return (
    <div className="viewToggle">
      <label htmlFor="viewToggleInput">View:</label>
      <input
        type="checkbox"
        id="viewToggleInput"
        checked={isMonthView}
        onChange={onChange}
      />
      <span className="slider"></span>
      <span>{isMonthView ? "Month" : "Week"}</span>
    </div>
  );
}
