import WeekDayHeader from "./WeekDayHeader.jsx";
import "../css/weekPanel.css";
import dayjs from "dayjs";
export default function WeekPanel({ selectedDate, todayDate }) {
  function generateCalendarForWeek() {
    const startDate = dayjs(selectedDate).startOf("week");
    const endDate = startDate.add(6, "day");
    const weekDays = [];
    for (let weekDate = startDate; weekDate.diff(endDate) <= 0; ) {
      console.log(weekDate.format("YYYY-MM-DD"));
      weekDays.push(
        <div className="week-day-header">
          <p>{weekDate.get("date")}</p>
        </div>
      );
      weekDate = weekDate.add(1, "day");
    }
    return weekDays;
  }

  function generateHours() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<div className="hours-div">{i}</div>);
    }
    return hours;
  }

  // function generateEmptyDivs() {
  //   const hours = [];
  //   for (let i = 0; i < 24; i++) {
  //     hours.push(<div className="hour-div"></div>);
  //   }
  //   return hours;
  // }

  return (
    <div className="week-container">
      <div className="week-header-container">
        <div className="hours-col-header"></div>
        <div className="week-col-header">{generateCalendarForWeek()}</div>
      </div>
      <div className="week-view-container">
        <div className="week-view-hours">{generateHours()}</div>
      </div>
    </div>
  );
}
