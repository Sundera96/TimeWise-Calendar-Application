import "../css/date-time.css";
import dayjs from "dayjs";
export default function DateTime({ inputs, handleOnChangeInput }) {
  const date = dayjs(inputs.dateTime, "YYYY-MM-DD HH:mm").format(
    "YYYY-MM-DDTHH:mm"
  );
  console.log(date);
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
          handleOnChangeInput(
            inputs.label,
            dayjs(event.target.value).format("YYYY-MM-DD HH:mm")
          );
        }}
      />
    </div>
  );
}
