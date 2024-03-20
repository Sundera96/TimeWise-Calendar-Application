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
  console.log("Day.jsx");
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

  function handleSaveModal(event) {
    event.preventDefault();
    dialog.current.close();
  }

  return (
    <>
      <EventModal ref={dialog} onClick={handleSaveModal} event={modalEvent} />
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
