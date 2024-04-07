import "../css/date.css";
export default function EventDate({ inputs, handleOnChangeInput }) {
  console.log("Event Date");
  const date = inputs.date;
  console.log(date);
  return (
    <div className="eventTime">
      <label>{inputs.labelInput}</label>
      <input
        type="date"
        value={date}
        onChange={(event) => {
          handleOnChangeInput(inputs.label, event.target.value);
        }}
      />
    </div>
  );
}
