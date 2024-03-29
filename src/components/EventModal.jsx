import TextBox from "./TextBox";
import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TextEditor from "./TextEditor";
import "../css/eventModal.css";
import DateTime from "./DateTime";
const EventModal = forwardRef(function EventModal(
  { eventData, setEventData, onClick, handleOnClose },
  ref
) {
  function handleOnChangeInput(label, events) {
    setEventData((prevData) => {
      return {
        ...prevData,
        [label]: events.target.value,
      };
    });
  }

  return createPortal(
    <dialog ref={ref} className="modal-dialog">
      <form method="dialog" id={eventData.eventId} onSubmit={onClick}>
        <h2 id="eventTypeForm">{eventData.eventType}</h2>
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
        {eventData.eventType === "LINK" && (
          <TextBox
            labelInput={"Link"}
            label={link}
            value={eventData.link}
            className={"LINK"}
          ></TextBox>
        )}
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
        <button type="button" onClick={handleOnClose}>
          Close
        </button>
        <button type="submit" className="SaveButton">
          Save
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EventModal;
