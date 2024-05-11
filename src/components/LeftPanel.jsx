import { useState, useContext, useEffect } from "react";
import "../css/leftPanel.css";
import EventInput from "./EventInput.jsx";
import { addEvent, getAllTopics } from "../util/query.js";
import { EventsContext } from "../store/events-view-context.jsx";
import { getEventObj, getRecurrenceCount } from "../util/util.js";
import dayjs from "dayjs";
export default function LeftPanel() {
  const eventsContext = useContext(EventsContext);
  const [event, setEvent] = useState({
    ...getEventObj("REMINDER"),
    ["title"]: "",
    ["topic"]: "DEFAULT",
    ["link"]: "",
  });
  const [selectedTab, setSelectedTab] = useState("REMINDER");
  useEffect(() => {
    getAllTopics(eventsContext.token, eventsContext.setTopics);
  }, []);

  async function onHandleSubmit(events) {
    events.preventDefault();
    try {
      const listOfData = await addEvent(
        event,
        eventsContext.token,
        eventsContext.selectedStartDate,
        eventsContext.selectedEndDate
      );
      if (event["type-tag"] === "TASK") {
        const listOfCurrentTask = [];
        const listOfUnfinishedTask = [];
        listOfData.forEach((item) => {
          const date = dayjs().startOf("day");
          if (
            !item.formHabit &&
            item.expiredDateTime === null &&
            date.diff(dayjs(item.taskDate, "YYYY-MM-DD")) > 0
          ) {
            listOfUnfinishedTask.push(item);
          } else if (
            item.expiredDateTime === null &&
            date.diff(dayjs(item.taskDate, "YYYY-MM-DD")) === 0
          ) {
            listOfCurrentTask.push(item);
          }
        });
        if (listOfCurrentTask.length > 0 || listOfUnfinishedTask.length > 0) {
          let habitProgress;
          const currDay = dayjs();
          if (
            listOfCurrentTask[0].formHabit &&
            dayjs(event["repeat-date"], "YYYY-MM-DD").diff(
              currDay.startOf("day")
            ) >= 0
          ) {
            habitProgress = {
              seriesId: listOfData[0].seriesId,
              title: listOfData[0].title,
              completedTask: 0,
              totalTask:
                getRecurrenceCount(
                  event["task-date"],
                  currDay.startOf("date").format("YYYY-MM-DD")
                ) + 1,
            };
          }
          eventsContext.setRightPanelState((prevState) => {
            return {
              ["currentTask"]: prevState.currentTask.concat(listOfCurrentTask),
              ["unFinishedTask"]:
                prevState.unFinishedTask.concat(listOfUnfinishedTask),
              ["trackerProgress"]: habitProgress
                ? prevState.trackerProgress.concat(habitProgress)
                : prevState.trackerProgress,
            };
          });
        }
      }

      eventsContext.setEvents(eventsContext.events.concat(listOfData));
      setEvent({
        ...getEventObj(event["type-tag"]),
        ["title"]: "",
        ["topic"]: "DEFAULT",
        ["link"]: "",
      });
    } catch (error) {}
  }

  return (
    <div className="LeftPanel">
      <EventInput
        event={event}
        setEvent={setEvent}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onHandleSubmit={onHandleSubmit}
      />
    </div>
  );
}
