import Day from "../components/Day.jsx";
import React, { useState, useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/monthPanel.css";
import dayjs from "dayjs";
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function MonthPanel({ currDateObject, view }) {
  const eventsContext = useContext(EventsContext);
  const [currentDate, setCurrentDate] = useState(dayjs());
  // console.log("Current Date");
  // console.log(currentDate.get("date"));
  // console.log(currentDate.get("month"));
  // console.log(currentDate.get("year"));
  // const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  // const [currMonthItems, setCurrMonthItems] = useState([]);
  console.log("How Many Times?");
  useEffect(() => {
    //Update the calendar at the beginning of each month
    // const intervalId = setInterval(() => {
    //   const now = new Date();
    //   if (now.getDate() !== currDateObject.currDate.getDate()) {
    //     setCurrentDate(now);
    //   }
    // }, 60000); // Check every minute for month change
    // return () => clearInterval(intervalId); // Clear interval on component unmount
    // /**
    //  * If current month changes execute data fetch
    //  */
  }, []);

  function handleClickOfDayCell(date) {
    currDateObject.setCurrDate((prev) => {
      return prev.set("date", date);
    });
    view(false);
  }

  const generateCalendar = () => {
    const days = [];
    const startingDay = currDateObject.currDate.startOf("month").get("day");
    console.log("Month Starting Day");
    console.log(startingDay);
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

    console.log(eventsContext.events);

    for (
      let i = 1;
      i <= currDateObject.currDate.endOf("month").get("Date");
      i++
    ) {
      const reminders = eventsContext.events.filter((rem) => {
        return (
          rem.eventType === "REMINDER" &&
          dayjs(rem.remindDateTime, "YYYY-MM-DD hh:mm:ss").get("date") === i
        );
      });
      console.log("Reminders");
      console.log(reminders);
      const meetings = eventsContext.events.filter((meeting) => {
        return (
          meeting.eventType === "MEETING" &&
          dayjs(meeting.startDateTime, "YYYY-MM-DD hh:mm:ss").get("date") === i
        );
      });
      const tasks = eventsContext.events.filter((task) => {
        return (
          task.eventType === "TASK" &&
          dayjs(task.taskDate, "YYYY-MM-DD hh:mm:ss").get("date") === i
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
            setCurrentDate: setCurrentDate,
          }}
          className={`day ${
            i == currentDate.get("date") &&
            currentDate.get("month") == currDateObject.currDate.get("month") &&
            currentDate.get("year") == currDateObject.currDate.get("year")
              ? "current"
              : ""
          }`}
        />
      );
      key++;
    }
    return days;
  };

  return (
    <div className="CenterPanel">
      <div className="Calendar">{generateCalendar()}</div>
    </div>
  );
}
