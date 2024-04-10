import { forwardRef } from "react";
import { createPortal } from "react-dom";
import "../css/eventModal.css";
import { Button } from "antd";
import EventFormFields from "./EventFormFields";
const EventModal = forwardRef(function EventModal(
  { eventData, setEventData, onClick, handleOnClose },
  ref
) {
  function handleOnChangeInput(label, value) {
    setEventData((prevData) => {
      return {
        ...prevData,
        [label]: value,
      };
    });
  }

  function handleEditorChangeInput(label, content) {
    console.log(label);
    setEventData((prevData) => {
      return {
        ...prevData,
        [label]: content,
      };
    });
  }

  return createPortal(
    <dialog ref={ref} className="modal-dialog">
      <form
        method="dialog"
        id={eventData["event-id"]}
        onSubmit={(events) => {
          onClick(events, eventData["update"].href);
        }}
      >
        <h2 id="eventTypeForm">{eventData["type-tag"]}</h2>
        <EventFormFields
          event={eventData}
          handleOnChangeInput={handleOnChangeInput}
          handleEditorChangeInput={handleEditorChangeInput}
          selectedTab={eventData["type-tag"]}
        />
        <Button type="primary" danger onClick={handleOnClose}>
          Close
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EventModal;
