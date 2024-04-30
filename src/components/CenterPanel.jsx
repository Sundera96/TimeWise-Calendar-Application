import MonthPanel from "./MonthPanel.jsx";
import WeekPanel from "./WeekPanel.jsx";
import NavigationButton from "./NavigationButton.jsx";
import { useState, useContext, useEffect, useRef } from "react";
import ToggleButton from "./ToggleButton.jsx";
import { EventsContext } from "../store/events-view-context.jsx";
import { fetchEvents } from "../util/query.js";
import "../css/centerPanel.css";
import { Input, Button, Form } from "antd";
import dayjs from "dayjs";
export default function CenterPanel() {
  const [currentView, setCurrentView] = useState({
    viewDate: dayjs().set("date", 1),
    viewType: "MONTH",
  });
  const [todayDate, setTodayDate] = useState(dayjs());
  const eventsContext = useContext(EventsContext);
  const formRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs();
      if (now.get("date") !== todayDate.get("date")) {
        setTodayDate(now);
      }
    }, 60000); // Check every minute for current date
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    fetchEvents(
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      eventsContext.setEvents,
      eventsContext.token
    );
  }, [currentView]);

  function handleClickOfDayCell(date) {
    setCurrentView({
      viewDate: currentView.viewDate.set("date", date),
      viewType: "WEEK",
    });
  }

  function handleNextClick() {
    if (currentView.viewType === "MONTH") {
      setCurrentView((prevView) => {
        const selectedDate = prevView.viewDate.add(1, "month").set("date", 1);
        eventsContext.selectedStartDate = selectedDate.format("YYYY-MM-DD");
        eventsContext.selectedEndDate = selectedDate
          .endOf("month")
          .format("YYYY-MM-DD");
        eventsContext.events = [];
        return { viewDate: selectedDate, viewType: prevView.viewType };
      });
    } else {
    }
  }

  function handlePrevClick() {
    if (isMonthView) {
      setCurrentView((prevView) => {
        const selectedDate = prevView.viewDate.subtract(1, "month");
        eventsContext.selectedStartDate = selectedDate.format("YYYY-MM-DD");
        eventsContext.selectedEndDate = selectedDate
          .endOf("month")
          .format("YYYY-MM-DD");
        eventsContext.events = [];
        return { viewDate: selectedDate, viewType: prevView.viewType };
      });
    } else {
    }
  }

  function handleTodayClick() {
    eventsContext.selectedStartDate = dayjs()
      .set("date", 1)
      .format("YYYY-MM-DD");
    eventsContext.selectedEndDate = dayjs()
      .set("date", 1)
      .endOf("month")
      .format("YYYY-MM-DD");
    setCurrentView((prevView) => {
      return { viewDate: dayjs(), viewType: prevView.viewType };
    });
  }

  const handleToggleClick = () => {
    console.log(currentView.viewType);
    const viewType = currentView.viewType === "MONTH" ? "WEEK" : "MONTH";
    console.log("Sundera");
    console.log(viewType);
    setCurrentView((prevView) => {
      return { viewDate: prevView.viewDate, viewType: viewType };
    });
  };

  function handleSubmitTopic(values) {
    eventsContext.topics = eventsContext.topics.concat(values.topic);
    console.log(eventsContext.topics);
    eventsContext.setTopics(eventsContext.topics);
    formRef.current.resetFields();
  }

  return (
    <div className="centerPanel">
      <div className="calendarNavigation">
        <div>
          <div>
            <NavigationButton name="Previous" onClick={handlePrevClick} />
            <NavigationButton name="Next" onClick={handleNextClick} />
            <NavigationButton name="Today" onClick={handleTodayClick} />
          </div>
        </div>
        <div>
          <h1 className="formattedDate">{`${currentView.viewDate.format(
            "MMMM"
          )} ${currentView.viewDate.format("YYYY")}`}</h1>
        </div>
        <div>
          <Form layout="inline" onFinish={handleSubmitTopic} ref={formRef}>
            <Form.Item name="topic">
              <Input style={{ width: "200px" }}></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Tag
            </Button>
          </Form>
        </div>
        <div>
          <ToggleButton
            onClick={handleToggleClick}
            isActive={currentView.viewType === "MONTH"}
          ></ToggleButton>
        </div>
      </div>

      {currentView.viewType === "MONTH" && (
        <MonthPanel
          todayDate={todayDate}
          currentDate={currentView.viewDate}
          currentViewState={setCurrentView}
          handleClickOfDayCell={handleClickOfDayCell}
        />
      )}
      {currentView.viewType === "WEEK" && (
        <WeekPanel selectedDate={currentView.viewDate} todayDate={todayDate} />
      )}
    </div>
  );
}
