import "../css/textBox.css";
export default function TextBox({
  label,
  labelInput,
  value,
  handleOnChangeInput,
}) {
  return (
    <div className="textbox-container">
      <label htmlFor={label} className="textbox-label">
        {labelInput}
      </label>
      <input
        type="text"
        className="textbox"
        id={label}
        value={value}
        onChange={(event) => {
          handleOnChangeInput(label, event.target.value);
        }}
      ></input>
    </div>
  );
}
