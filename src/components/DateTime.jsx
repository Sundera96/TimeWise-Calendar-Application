import "../css/date-time.css";
export default function DateTime({ inputs, handleOnChangeInput }) {
  const defaultDate = inputs.dateTime || new Date().toISOString().slice(0, 16);
  return (
    <div className="eventTime">
      <label>{inputs.labelInput}</label>
      <input
        type="datetime-local"
        value={defaultDate}
        onChange={(event) => {
          handleOnChangeInput(inputs.label, event);
        }}
      />
    </div>
  );
}
