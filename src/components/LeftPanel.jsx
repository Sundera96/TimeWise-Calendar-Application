import { useState } from "react";
import "../css/leftPanel.css";
import EventInput from "./EventInput.jsx";
export default function LeftPanel() {
  const [event, setEvent] = useState({
    title: "",
    topic: "",
    priority: "",
  });

  function onHandleSubmit(events) {
    events.preventDefault();
    console.log(event);
  }

  return (
    <>
      <div className="LeftPanel">
        <EventInput
          event={event}
          setEvent={setEvent}
          onHandleSubmit={onHandleSubmit}
        ></EventInput>
      </div>
    </>
  );
}
