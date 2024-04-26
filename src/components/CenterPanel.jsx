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
  const [currDate, setCurrDate] = useState(dayjs().set("date", 1));
  const [isMonthView, setIsMonthView] = useState(true);
  const eventsContext = useContext(EventsContext);
  const formRef = useRef();
  useEffect(() => {
    fetchEvents(
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      eventsContext.setEvents,
      eventsContext.token
    );
  }, [isMonthView, currDate]);

  function handleNextClick() {
    if (isMonthView) {
      setCurrDate((prevDate) => {
        const selectedDate = prevDate.add(1, "month");
        eventsContext.selectedStartDate = selectedDate.format("YYYY-MM-DD");
        eventsContext.selectedEndDate = selectedDate
          .endOf("month")
          .format("YYYY-MM-DD");
        eventsContext.events = [];
        return selectedDate;
      });
    } else {
      setCurrDate((prevDate) => {
        // const date = new Date();
        // date.setFullYear(prevDate.getFullYear());
        // date.setMonth(prevDate.getMonth());
        // date.setDate(prevDate.getDate() + 7);
        // return date;
      });
    }
  }

  function handlePrevClick() {
    if (isMonthView) {
      setCurrDate((prevDate) => {
        const selectedDate = prevDate.subtract(1, "month");
        eventsContext.selectedStartDate = selectedDate.format("YYYY-MM-DD");
        eventsContext.selectedEndDate = selectedDate
          .endOf("month")
          .format("YYYY-MM-DD");
        eventsContext.events = [];
        return selectedDate;
      });
    } else {
      // setCurrDate((prevDate) => {
      //   const date = new Date();
      //   date.setFullYear(prevDate.getFullYear());
      //   date.setMonth(prevDate.getMonth());
      //   date.setDate(prevDate.getDate() - 7);
      //   return date;
      // });
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
    setCurrDate(dayjs().set("date", 1));
  }

  const handleToggleClick = () => {
    setIsMonthView(!isMonthView);
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
          <h1 className="formattedDate">{`${currDate.format(
            "MMMM"
          )} ${currDate.format("YYYY")}`}</h1>
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
