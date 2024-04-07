import Day from "../components/Day.jsx";
import React, { useState, useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/monthPanel.css";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function MonthPanel({ currDateObject, view }) {
  const eventsContext = useContext(EventsContext);
  const [currentDate, setCurrentDate] = useState(new Date());
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
      return new Date(prev.setDate(date));
    });
    view(false);
  }

  const generateCalendar = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      currDateObject.currDate.getFullYear(),
      currDateObject.currDate.getMonth(),
      1
    );
    const startingDay = firstDayOfMonth.getDay();
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

    for (
      let i = 1;
      i <=
      new Date(
        currDateObject.currDate.getFullYear(),
        currDateObject.currDate.getMonth() + 1,
        0
      ).getDate();
      i++
    ) {
      const reminders = eventsContext.events.filter((rem) => {
        return new Date(rem.remindDateTime).getDate() == i;
      });
      const meetings = eventsContext.events.filter((meeting) => {
        return new Date(meeting.startDateTime).getDate() == i;
      });
      const tasks = eventsContext.events.filter((task) => {
        return new Date(task.taskDate).getDate() == i - 1;
      });

      const links = eventsContext.events.filter((link) => {
        return new Date(link.linkDateTime).getDate() == i;
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
            i == currentDate.getDate() &&
            currentDate.getMonth() == currDateObject.currDate.getMonth() &&
            currentDate.getFullYear() == currDateObject.currDate.getFullYear()
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
