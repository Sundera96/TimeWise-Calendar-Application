import Day from "../components/Day.jsx";
import React, { useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/monthPanel.css";
export default function MonthPanel({ selectedDate }) {
  const eventsContext = useContext(EventsContext);
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  // const [currMonthItems, setCurrMonthItems] = useState([]);

  useEffect(() => {
    // Update the calendar at the beginning of each month
    // const intervalId = setInterval(() => {
    //   const now = new Date();
    //   if (now.getMonth() !== currentMonth) {
    //     setCurrentDate(now);
    //     setCurrentMonth(now.getMonth());
    //   }
    // }, 60000); // Check every minute for month change
    // return () => clearInterval(intervalId); // Clear interval on component unmount
    /**
     * If current month changes execute data fetch
     */
  }, [selectedDate]);

  const generateCalendar = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const startingDay = firstDayOfMonth.getDay();
    let key = 0;
    for (let i = 0; i < startingDay; i++) {
      days.push(<Day key={key++} className="day empty"></Day>);
    }

    for (
      let i = 1;
      i <=
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate();
      i++
    ) {
      const reminders = eventsContext.reminder.filter((rem) => {
        return new Date(rem.remindDateTime).getDate() == i;
      });
      const meetings = eventsContext.meeting.filter((meeting) => {
        return new Date(meeting.meetingStartDateTime).getDate() == i;
      });
      const tasks = eventsContext.task.filter((task) => {
        return new Date(task.taskDate).getDate() == i;
      });

      const eventObj = {
        reminders: reminders,
        meetings: meetings,
        tasks: tasks,
      };
      days.push(
        <Day cellValue={i} eventValues={eventObj} key={key++} className="day" />
      );
    }
    return days;
  };

  return (
    <div className="CenterPanel">
      <div className="Calendar">{generateCalendar()}</div>
    </div>
  );
}
