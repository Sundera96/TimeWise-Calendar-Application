import "../css/date.css";
import dayjs from "dayjs";
export default function EventDate({ inputs, handleOnChangeInput }) {
  const date = inputs.date;
  console.log(date);
  return (
    <div className="eventTime">
      <label>{inputs.labelInput}</label>
      <input
        type="date"
        value={date}
        onChange={(event) => {
          handleOnChangeInput(
            inputs.label,
            dayjs(event.target.value).format("YYYY-MM-DD")
          );
        }}
      />
    </div>
  );
}
