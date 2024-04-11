import TextBox from "./TextBox.jsx";
import DateTime from "./DateTime.jsx";
import TextEditor from "./TextEditor.jsx";
import EventDate from "./EventDate.jsx";
import Dropdown from "./Dropdown.jsx";
import { Checkbox } from "antd";
export default function EventFormFields({
  event,
  handleOnChangeInput,
  handleEditorChangeInput,
  selectedTab,
  populateRecurrence,
  calledBy,
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
          <Dropdown
            labelInput={"Priority"}
            label={"priority"}
            value={event["priority"]}
            handleOnChangeInput={handleOnChangeInput}
          ></Dropdown>
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
              dateTime: event["start-date-time"],
              labelInput: "Start",
              label: "start-date-time",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
          <DateTime
            inputs={{
              dateTime: event["end-date-time"],
              labelInput: "End",
              label: "end-date-time",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
          {populateRecurrence && (
            <EventDate
              inputs={{
                date: event["repeat-date"],
                labelInput: "Repeat Until Date",
                label: "repeat-date",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
          )}
        </>
      )}

      {selectedTab == "REMINDER" && (
        <>
          <DateTime
            inputs={{
              dateTime: event["remind-date-time"],
              labelInput: "Set Reminder",
              label: "remind-date-time",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />

          {populateRecurrence && (
            <EventDate
              inputs={{
                date: event["repeat-date"],
                labelInput: "Repeat Until Date",
                label: "repeat-date",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
          )}
        </>
      )}

      {selectedTab == "TASK" && (
        <>
          <EventDate
            inputs={{
              date: event["task-date"],
              labelInput: "Task Date",
              label: "task-date",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
          <Checkbox
            checked={event["habit-tracker"]}
            onChange={(event) => {
              handleOnChangeInput("habit-tracker", event.target.checked);
            }}
          >
            Build Your Routine?
          </Checkbox>
        </>
      )}
      {selectedTab != "" && (
        <>
          <TextEditor
            editorInput={event.notes}
            handleOnChangeInput={handleEditorChangeInput}
            label={"notes"}
          ></TextEditor>
        </>
      )}
    </>
  );
}
