import EventModal from "./EventModal.jsx";
import EventPill from "./EventPill.jsx";
import { useRef, useState } from "react";
export default function Day({ cellValue, eventValues, ...props }) {
  const [modalEvent, setModalEvent] = useState({});
  const dialog = useRef();
  function handleOnClickEventPill(title, link) {
    dialog.current.showModal();
  }

  return (
    <>
      <EventModal ref={dialog} event={modalEvent} />
      <div {...props}>
        <div>{cellValue}</div>
        {eventValues &&
          Object.entries(eventValues).map(
            ([key, val]) =>
              val &&
              val.map((item) => (
                <EventPill
                  key={item.id}
                  title={item.title}
                  link={item.link}
                  type={key}
                  onClick={handleOnClickEventPill}
                />
              ))
          )}
      </div>
    </>
  );
}
