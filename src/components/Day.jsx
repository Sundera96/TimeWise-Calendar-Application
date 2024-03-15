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
                  key={item.id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  onClick={handleOnClickEventPill}
                />
              ))
          )}
      </div>
    </>
  );
}
