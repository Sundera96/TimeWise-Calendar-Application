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
  const [modalEvent, setModalEvent] = useState({
    title: "",
    topic: "DEFAULT",
  });
  const dialog = useRef();
  const eventContext = useContext(EventsContext);

  async function handleOnClickEventPill(link, caller) {
    if (!caller) {
      const data = await fetchEvent(link, eventContext.token);
      console.log(data);
      setModalEvent(data);
      dialog.current.showModal();
    } else {
      console.log("Task should be updated");
    }
  }

  async function handleSaveModal(events, link) {
    events.preventDefault();
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
    monthDateState.setCurrentDate({
      viewDate: dayjs(monthDateState.currentDate),
      viewType: "MONTH",
    });
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
