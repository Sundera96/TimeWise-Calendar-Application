import EventModal from "./EventModal.jsx";
import EventPill from "./EventPill.jsx";
import { useRef, useState, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import "../css/day.css";
import { updateEvent, fetchEvent } from "../util/query.js";
import dayjs from "dayjs";
export default function Day({
  cellValue,
  day,
  onClick,
  eventValues,
  monthDateState,
  ...props
}) {
  console.log("Day");
  console.log(eventValues);
  const [modalEvent, setModalEvent] = useState({
    title: "",
    topic: "",
  });
  const dialog = useRef();
  const eventContext = useContext(EventsContext);

  async function handleOnClickEventPill(link, caller) {
    if (!caller) {
      const data = await fetchEvent(link, eventContext.token);
      setModalEvent(data);
      dialog.current.showModal();
    } else {
      console.log("Task should be updated");
    }
  }

  async function handleSaveModal(events, link) {
    events.preventDefault();
    console.log("INside Handle Save Modal");
    console.log(eventContext.events);
    const eventContextData = await updateEvent(
      modalEvent,
      eventContext.token,
      eventContext.selectedStartDate,
      eventContext.selectedEndDate,
      link,
      eventContext.events
    );
    console.log(eventContextData);
    eventContext.events = eventContextData;
    monthDateState.setCurrentDate(dayjs(monthDateState.currentDate));
    dialog.current.close();
  }

  function handleOnClose() {
    dialog.current.close();
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
                <EventPill event={item} onClick={handleOnClickEventPill} />
              ))
          )}
      </div>
    </>
  );
}
