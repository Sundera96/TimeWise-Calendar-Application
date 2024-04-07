import "../css/date-time.css";
export default function DateTime({ inputs, handleOnChangeInput }) {
  const date = inputs.dateTime;
  return (
    <div className="eventTime">
      <label htmlFor={inputs.label} className="event-label">
        {inputs.labelInput}
      </label>
      <input
        type="datetime-local"
        id={inputs.label}
        value={date}
        onChange={(event) => {
          handleOnChangeInput(inputs.label, event.target.value);
        }}
      />
    </div>
  );
}
