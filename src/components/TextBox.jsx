import "../css/textBox.css";
export default function TextBox({ label, value, handleOnChangeInput }) {
  return (
    <div className="textbox-container">
      <label htmlFor={label} className="textbox-label">
        {label}
      </label>
      <input
        type="text"
        className="textbox"
        id={label}
        value={value}
        onChange={(event) => {
          handleOnChangeInput(label, event);
        }}
      ></input>
    </div>
  );
}
