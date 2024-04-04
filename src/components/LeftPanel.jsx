import { useState, useContext } from "react";
import "../css/leftPanel.css";
import EventInput from "./EventInput.jsx";
import { addEvent } from "../util/query.js";
import { EventsContext } from "../store/events-view-context.jsx";

export default function LeftPanel() {
  const eventsContext = useContext(EventsContext);
  const [event, setEvent] = useState({ title: "", topic: "", priority: "" });
  const [selectedTab, setSelectedTab] = useState("");

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
      setEvent({ title: "", topic: "", priority: "" });
      setSelectedTab(false);
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
