import "../css/date-time.css";
export default function DateTime({ inputs, handleOnChangeInput }) {
  const defaultDate = inputs.dateTime.toISOString().slice(0, 16);
  return (
    <div className="eventTime">
      <label htmlFor={inputs.label} className="event-label">
        {inputs.labelInput}
      </label>
      <input
        type="datetime-local"
        id={inputs.label}
        value={defaultDate}
        onChange={(event) => {
          handleOnChangeInput(inputs.label, event.target.value);
        }}
      />
    </div>
  );
}
