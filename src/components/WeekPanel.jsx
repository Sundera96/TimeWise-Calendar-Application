import WeekDay from "./WeekDay.jsx";
import "../css/weekPanel.css";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
export default function WeekPanel({ selectedDate, todayDate }) {
  const eventsContext = useContext(EventsContext);
  function generateCalendarForWeek() {
    const startDate = dayjs(selectedDate).startOf("week");
    const endDate = startDate.add(6, "day");
    const weekDays = [];
    for (let weekDate = startDate; weekDate.diff(endDate) <= 0; ) {
      weekDays.push(
        <div
          className={`week-day-header ${
            weekDate.get("date") == todayDate.get("date") &&
            weekDate.get("month") == todayDate.get("month") &&
            weekDate.get("year") == todayDate.get("year")
              ? "current"
              : ""
          }`}
        >
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

  function generateEmptyDayDivs() {
    const days = [];
    const startDate = dayjs(selectedDate).startOf("week");
    const endDate = startDate.add(6, "day");
    for (let weekDate = startDate; weekDate.diff(endDate) <= 0; ) {
      const reminders = eventsContext.events.filter((rem) => {
        return (
          rem.eventType === "REMINDER" &&
          dayjs(rem.remindDateTime, "YYYY-MM-DD hh:mm:ss").get("date") ===
            weekDate.get("date")
        );
      });

      const meetings = eventsContext.events.filter((meeting) => {
        return (
          meeting.eventType === "MEETING" &&
          dayjs(meeting.startDateTime, "YYYY-MM-DD hh:mm:ss").get("date") ===
            weekDate.get("date")
        );
      });
      // const tasks = eventsContext.events.filter((task) => {
      //   return (
      //     task.eventType === "TASK" &&
      //     dayjs(task.taskDate, "YYYY-MM-DD").get("date") ===
      //       weekDate.get("date")
      //   );
      // });

      const links = eventsContext.events.filter((link) => {
        return (
          link.eventType === "LINK" &&
          dayjs(link.linkDateTime, "YYYY-MM-DD hh:mm:ss").get("date") ===
            weekDate.get("date")
        );
      });
      const listOfEvents = reminders.concat(meetings).concat(links);
      days.push(<WeekDay events={listOfEvents}></WeekDay>);
      weekDate = weekDate.add(1, "day");
    }
    return days;
  }

  return (
    <div className="week-container">
      <div className="week-header-container">
        <div className="hours-col-header"></div>
        <div className="week-col-header">{generateCalendarForWeek()}</div>
      </div>
      <div className="week-view-container">
        <div className="week-view-hours">{generateHours()}</div>
        <div className="week-view-days">{generateEmptyDayDivs()}</div>
      </div>
    </div>
  );
}
