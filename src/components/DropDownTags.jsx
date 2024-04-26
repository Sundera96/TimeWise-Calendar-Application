import "../css/dropdown.css";
export default function DropdownTags({
  label,
  labelInput,
  value,
  handleOnChangeInput,
  topics,
}) {
  console.log("Topic Value");
  console.log(value);
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
        {topics.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
