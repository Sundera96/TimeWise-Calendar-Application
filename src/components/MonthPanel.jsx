import Day from "../components/Day.jsx";
import React, { useState, useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/monthPanel.css";
import dayjs from "dayjs";
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function MonthPanel({
  todayDate,
  currentDate,
  currentViewState,
  handleClickOfDayCell,
}) {
  const eventsContext = useContext(EventsContext);
  const generateCalendar = () => {
    const days = [];
    const startingDay = currentDate.startOf("month").get("day");
    let key = 0;
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <Day
          key={key++}
          day={key < 7 ? week[key] : ""}
          className="day empty"
        ></Day>
      );
    }

    for (let i = 1; i <= currentDate.endOf("month").get("Date"); i++) {
      const reminders = eventsContext.events.filter((rem) => {
        return (
          rem.eventType === "REMINDER" &&
          dayjs(rem.remindDateTime, "YYYY-MM-DD hh:mm:ss").get("date") === i
        );
      });

      const meetings = eventsContext.events.filter((meeting) => {
        return (
          meeting.eventType === "MEETING" &&
          dayjs(meeting.startDateTime, "YYYY-MM-DD hh:mm:ss").get("date") === i
        );
      });
      const tasks = eventsContext.events.filter((task) => {
        return (
          task.eventType === "TASK" &&
          dayjs(task.taskDate, "YYYY-MM-DD").get("date") === i
        );
      });

      const links = eventsContext.events.filter((link) => {
        return (
          link.eventType === "LINK" &&
          dayjs(link.linkDateTime, "YYYY-MM-DD hh:mm:ss").get("date") === i
        );
      });

      const eventObj = {
        reminder: reminders,
        meeting: meetings,
        task: tasks,
        link: links,
      };
      days.push(
        <Day
          cellValue={i}
          eventValues={eventObj}
          key={key}
          day={key < 7 ? week[key] : ""}
          onClick={handleClickOfDayCell}
          monthDateState={{
            currentDate: currentDate,
            setCurrentDate: currentViewState,
          }}
          className={`day ${
            i == todayDate.get("date") &&
            currentDate.get("month") == todayDate.get("month") &&
            currentDate.get("year") == todayDate.get("year")
              ? "current"
              : ""
          }`}
        />
      );
      key = key + 1;
    }
    return days;
  };
  return (
    <div className="CenterPanel">
      <div className="Calendar">{generateCalendar()}</div>
    </div>
  );
}
