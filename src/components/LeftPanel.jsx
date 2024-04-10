import { useState, useContext } from "react";
import "../css/leftPanel.css";
import EventInput from "./EventInput.jsx";
import { addEvent } from "../util/query.js";
import { EventsContext } from "../store/events-view-context.jsx";
import { getEventObj } from "../util/util.js";

export default function LeftPanel() {
  const eventsContext = useContext(EventsContext);
  const [event, setEvent] = useState({
    ...getEventObj("REMINDER"),
    ["title"]: "",
    ["topic"]: "",
    ["link"]: "",
  });
  const [selectedTab, setSelectedTab] = useState("REMINDER");

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
      setEvent({
        ...getEventObj(event["type-tag"]),
        title: "",
        topic: "",
        link: "",
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
