import "../css/date.css";
export default function EventDate({ inputs, handleOnChangeInput }) {
  const defaultDate = inputs.date || new Date().toISOString().slice(0, 10);
  return (
    <div className="eventTime">
      <label>{inputs.labelInput}</label>
      <input
        type="date"
        value={defaultDate}
        onChange={(event) => {
          handleOnChangeInput(inputs.label, event.target.value);
        }}
      />
    </div>
  );
}
