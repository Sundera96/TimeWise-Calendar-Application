import MonthPanel from "./MonthPanel.jsx";
import WeekPanel from "./WeekPanel.jsx";
import NavigationButton from "./NavigationButton.jsx";
import { useState } from "react";
import ToggleButton from "./ToggleButton.jsx";
import "../css/centerPanel.css";
export default function CenterPanel() {
  const [currDate, setCurrDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);

  function handleNextClick() {
    if (isMonthView) {
      setCurrDate((prevDate) => {
        const date = new Date();
        date.setFullYear(prevDate.getFullYear());
        date.setDate(1);
        date.setMonth(prevDate.getMonth() + 1);
        return date;
      });
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

      {isMonthView && <MonthPanel selectedDate={currDate} />}
      {!isMonthView && <WeekPanel selectedDate={currDate} />}
    </div>
  );
}
