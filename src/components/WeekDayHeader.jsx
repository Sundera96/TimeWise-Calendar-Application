import "../css/weekDay.css";

export default function WeekDayHeader({ date }) {
  return (
    <div className="week-day-header">
      <p>{date.get("date")}</p>
    </div>
  );
}
