import "../css/textBox.css";
export default function TextBox({ label, value }) {
  return (
    <div className="textbox-container">
      <label className="textbox-label">{label}</label>
      <input type="text" className="textbox" value={value} />
    </div>
  );
}
