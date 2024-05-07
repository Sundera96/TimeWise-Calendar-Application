import { useState, useContext, useEffect } from "react";
import "../css/leftPanel.css";
import EventInput from "./EventInput.jsx";
import { addEvent, getAllTopics } from "../util/query.js";
import { EventsContext } from "../store/events-view-context.jsx";
import { getEventObj } from "../util/util.js";

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
  function onHandleSubmit(events) {
    events.preventDefault();
    try {
      addEvent(
        event,
        eventsContext.token,
        eventsContext.selectedStartDate,
        eventsContext.selectedEndDate,
        eventsContext.events,
        eventsContext.setEvents
      );
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
