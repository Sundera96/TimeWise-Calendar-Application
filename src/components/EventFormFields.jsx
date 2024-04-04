import TextBox from "./TextBox.jsx";
import DateTime from "./DateTime.jsx";
import TextEditor from "./TextEditor.jsx";
import EventDate from "./EventDate.jsx";
export default function EventFormFields({
  event,
  handleOnChangeInput,
  handleEditorChangeInput,
  selectedTab,
}) {
  return (
    <>
      {selectedTab != "" && (
        <>
          <TextBox
            labelInput={"Title"}
            label={"title"}
            value={event["title"]}
            handleOnChangeInput={handleOnChangeInput}
          />
          <TextBox
            labelInput={"Tag"}
            label={"topic"}
            value={event["topic"]}
            handleOnChangeInput={handleOnChangeInput}
          />
          <TextBox
            labelInput={"Priority"}
            label={"priority"}
            value={event["priority"]}
            handleOnChangeInput={handleOnChangeInput}
          ></TextBox>
        </>
      )}
      {selectedTab === "LINK" && (
        <TextBox
          labelInput={"Link"}
          label={"link"}
          value={event.link}
          handleOnChangeInput={handleOnChangeInput}
        ></TextBox>
      )}
      {selectedTab == "MEETING" && (
        <>
          <DateTime
            inputs={{
              dateTime: new Date(event["start-date-time"]),
              labelInput: "Start",
              label: "start-date-time",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
          <DateTime
            inputs={{
              dateTime: new Date(event["end-date-time"]),
              labelInput: "End",
              label: "end-date-time",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
        </>
      )}

      {selectedTab == "REMINDER" && (
        <DateTime
          inputs={{
            dateTime: new Date(event["remind-date-time"]),
            labelInput: "Time",
            label: "remind-date-time",
          }}
          handleOnChangeInput={handleOnChangeInput}
        />
      )}

      {selectedTab == "TASK" && (
        <EventDate
          inputs={{
            date: event["task-date"],
            labelInput: "Task Date",
            label: "task-date",
          }}
          handleOnChangeInput={handleOnChangeInput}
        />
      )}
      {selectedTab != "" && (
        <>
          <TextEditor
            editorInput={event.notes}
            handleOnChangeInput={handleEditorChangeInput}
            label={"notes"}
          ></TextEditor>
          <button type="submit" className="SaveButton">
            Submit
          </button>
        </>
      )}
    </>
  );
}
