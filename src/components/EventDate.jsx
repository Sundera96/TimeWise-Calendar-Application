export default function EventDate() {
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
