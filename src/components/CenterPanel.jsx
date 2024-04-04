import MonthPanel from "./MonthPanel.jsx";
import WeekPanel from "./WeekPanel.jsx";
import NavigationButton from "./NavigationButton.jsx";
import { useState, useContext, useEffect } from "react";
import ToggleButton from "./ToggleButton.jsx";
import { EventsContext } from "../store/events-view-context.jsx";
import { fetchEvents } from "../util/query.js";
import "../css/centerPanel.css";
import { formatDate, monthEndDate } from "../util/util.js";
export default function CenterPanel() {
  const [currDate, setCurrDate] = useState(new Date(new Date().setDate(1)));
  const [isMonthView, setIsMonthView] = useState(true);
  const eventsContext = useContext(EventsContext);
  useEffect(() => {
    let startDate;
    if (isMonthView) {
      startDate = new Date(currDate.setDate(1));
    } else {
      startDate = currDate;
    }
    async function getAllEvents() {
      fetchEvents(
        eventsContext.selectedStartDate,
        eventsContext.selectedEndDate,
        eventsContext.setEvents,
        eventsContext.token
      );
    }
    getAllEvents();
  }, [isMonthView, currDate]);

  function handleNextClick() {
    if (isMonthView) {
      console.log("next getting clicked");
      const selectedDate = new Date(currDate.setMonth(currDate.getMonth() + 1));
      console.log("seelcted date");
      console.log(selectedDate);
      eventsContext.selectedStartDate = formatDate(selectedDate);
      eventsContext.selectedEndDate = formatDate(monthEndDate(selectedDate));
      setCurrDate(selectedDate);
    } else {
      setCurrDate((prevDate) => {
        const date = new Date();
        date.setFullYear(prevDate.getFullYear());
        date.setMonth(prevDate.getMonth());
        date.setDate(prevDate.getDate() + 7);
        return date;
      });
    }
  }

  function handlePrevClick() {
    if (isMonthView) {
      setCurrDate((prevDate) => {
        const date = new Date();
        date.setFullYear(prevDate.getFullYear());
        date.setDate(1);
        date.setMonth(prevDate.getMonth() - 1);
        eventsContext.selectedStartDate = formatDate(date);
        eventsContext.selectedEndDate = formatDate(monthEndDate(date));
        return date;
      });
    } else {
      setCurrDate((prevDate) => {
        const date = new Date();
        date.setFullYear(prevDate.getFullYear());
        date.setMonth(prevDate.getMonth());
        date.setDate(prevDate.getDate() - 7);
        return date;
      });
    }
  }

  function handleTodayClick() {
    setCurrDate(new Date());
  }

  const handleToggleClick = () => {
    setIsMonthView(!isMonthView);
  };
  const formattedDate = currDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="centerPanel">
      <div className="calendarNavigation">
        <div>
          <NavigationButton name="Previous" onClick={handlePrevClick} />
          <NavigationButton name="Next" onClick={handleNextClick} />
          <NavigationButton name="Today" onClick={handleTodayClick} />
        </div>
        <h1 className="formattedDate">{formattedDate}</h1>
        <div>
          <ToggleButton
            onClick={handleToggleClick}
            isActive={isMonthView}
          ></ToggleButton>
        </div>
      </div>

      {isMonthView && (
        <MonthPanel
          currDateObject={{ currDate: currDate, setCurrDate: setCurrDate }}
          view={setIsMonthView}
        />
      )}
      {!isMonthView && <WeekPanel selectedDate={currDate} />}
    </div>
  );
}
