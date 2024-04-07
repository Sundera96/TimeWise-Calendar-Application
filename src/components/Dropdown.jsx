import "../css/dropdown.css";

export default function Dropdown({
  label,
  labelInput,
  value,
  handleOnChangeInput,
}) {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{labelInput}</label>
      <select
        className="dropdown"
        onChange={(event) => {
          handleOnChangeInput(label, event.target.value);
        }}
        value={value}
      >
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
    </div>
  );
}
