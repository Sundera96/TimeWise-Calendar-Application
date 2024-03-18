import EventModal from "./EventModal.jsx";
import EventPill from "./EventPill.jsx";
import { useRef, useState } from "react";
import "../css/day.css";
export default function Day({
  cellValue,
  day,
  onClick,
  eventValues,
  ...props
}) {
  const [modalEvent, setModalEvent] = useState({});
  const dialog = useRef();
  function handleOnClickEventPill(link) {
    console.log(link);
    dialog.current.showModal();
  }

  function handleSaveModal(event) {
    event.preventDefault();
    dialog.current.close();
  }
  console.log(eventValues);

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
