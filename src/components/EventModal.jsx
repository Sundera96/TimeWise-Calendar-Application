import TextBox from "./TextBox";
import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TextEditor from "./TextEditor";
import "../css/eventModal.css";
import DateTime from "./DateTime";
const EventModal = forwardRef(function EventModal({ event, onClick }, ref) {
  const [eventData, setEventData] = useState(event);

  useEffect(() => {
    setEventData(event);
  }, [event]);

  function handleOnChangeInput(label, events) {
    console.log(label);
    const updatedEvent = {
      ...eventData,
      [label]: events.target.value,
    };
    setEventData(updatedEvent);
  }

  return createPortal(
    <dialog ref={ref} className="modal-dialog">
      <h2> {eventData.eventType}</h2>
      <form onSubmit={onClick}>
        <TextBox
          labelInput={"Title"}
          label={"title"}
          value={eventData.title}
          handleOnChangeInput={handleOnChangeInput}
        />
        <TextBox
          labelInput={"Tag"}
          label={"topic"}
          value={eventData.topic}
          handleOnChangeInput={handleOnChangeInput}
        />
        <TextBox
          labelInput={"Priority"}
          label={"priority"}
          value={eventData.priority}
          handleOnChangeInput={handleOnChangeInput}
        ></TextBox>
        {eventData.eventType == "MEETING" && (
          <div>
            <DateTime
              inputs={{
                dateTime: eventData.startDateTime,
                labelInput: "Start ",
                label: "startDateTime",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
            <DateTime
              inputs={{
                dateTime: eventData.endDateTime,
                labelInput: "End ",
                label: "endDateTime",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
          </div>
        )}

        {eventData.eventType == "REMINDER" && (
          <DateTime
            inputs={{
              dateTime: eventData.remindDateTime,
              labelInput: "Remind Time",
              label: "remindDateTime",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
        )}

        {eventData.eventType == "TASK" && (
          <DateTime
            inputs={{
              dateTime: eventData.taskDate,
              labelInput: "Task Date",
              label: "taskDate",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
        )}
        <TextEditor
          editorInput={eventData.notes}
          handleOnChangeInput={handleOnChangeInput}
          label={"notes"}
        ></TextEditor>
        <button>Close</button>
        <button type="submit" className="SaveButton">
          Save
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EventModal;
