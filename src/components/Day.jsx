import EventModal from "./EventModal.jsx";
import EventPill from "./EventPill.jsx";
import { useRef, useState, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/day.css";
import { fetchEvent } from "../util/query.js";
export default function Day({
  cellValue,
  day,
  onClick,
  eventValues,
  ...props
}) {
  const [modalEvent, setModalEvent] = useState({
    title: "",
    topic: "",
    priority: "",
  });
  const dialog = useRef();
  const eventContext = useContext(EventsContext);
  async function handleOnClickEventPill(link) {
    const data = await fetchEvent(link, eventContext.token);
    setModalEvent(data);
    dialog.current.showModal();
  }

  async function saveEvent(events) {}

  function handleSaveModal(events) {
    events.preventDefault();
    console.log(modalEvent);
    dialog.current.close();
  }

  function handleOnClose() {
    dialog.current.close();
    const id = "8a6ffcaa-eb50-48a6-9db4-0fc5ff8d4f0a";
    console.log(eventValues);
  }

  return (
    <>
      <EventModal
        ref={dialog}
        onClick={handleSaveModal}
        eventData={modalEvent}
        setEventData={setModalEvent}
        handleOnClose={handleOnClose}
      />
      <div {...props}>
        {day !== "" && <p>{day}</p>}
        <p
          className="clickable-paragraph"
          value={cellValue}
          onClick={() => {
            onClick(cellValue);
          }}
        >
          {cellValue}
        </p>
        {eventValues &&
          Object.entries(eventValues).map(
            ([_, val]) =>
              val &&
              val.map((item) => (
                <EventPill
                  key={item.eventId}
                  title={item.title}
                  link={item.links[0].href}
                  type={item.eventType}
                  onClick={handleOnClickEventPill}
                />
              ))
          )}
      </div>
    </>
  );
}
