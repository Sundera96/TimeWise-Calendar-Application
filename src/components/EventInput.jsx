import { useState } from "react";
import "../css/eventInput.css";
import TabButton from "./TabButton.jsx";
import TextBox from "./TextBox.jsx";
import DateTime from "./DateTime.jsx";
import TextEditor from "./TextEditor.jsx";
export default function EventInput({ event, setEvent, onHandleSubmit }) {
  const [selectedTab, setSelectedTab] = useState("");

  function handleOnClick(inputValue) {
    setSelectedTab(inputValue);
  }

  function handleOnChangeInput(label, events) {
    console.log(label);
    console.log(events.target.value);
    console.log("end");
    setEvent((prevData) => {
      return {
        ...prevData,
        [label]: events.target.value,
      };
    });
  }

  function handleEditorChangeInput(label, content) {
    console.log(label);
    setEvent((prevData) => {
      return {
        ...prevData,
        [label]: content,
      };
    });
  }

  return (
    <div className="event-input-container">
      <menu>
        <TabButton
          onClick={handleOnClick}
          className={selectedTab === "REMINDER" ? "currentTab" : "tab-button"}
        >
          REMINDER
        </TabButton>
        <TabButton
          onClick={handleOnClick}
          className={selectedTab === "TASK" ? "currentTab" : "tab-button"}
        >
          TASK
        </TabButton>
        <TabButton
          onClick={handleOnClick}
          className={selectedTab === "MEETING" ? "currentTab" : "tab-button"}
        >
          MEETING
        </TabButton>
        <TabButton
          onClick={handleOnClick}
          className={selectedTab === "LINK" ? "currentTab" : "tab-button"}
        >
          LINK
        </TabButton>
      </menu>
      <form onSubmit={onHandleSubmit}>
        {selectedTab != "" && (
          <>
            <TextBox
              labelInput={"Title"}
              label={"title"}
              value={event.title}
              handleOnChangeInput={handleOnChangeInput}
            />
            <TextBox
              labelInput={"Tag"}
              label={"topic"}
              handleOnChangeInput={handleOnChangeInput}
            />
            <TextBox
              labelInput={"Priority"}
              label={"priority"}
              value={event.priority}
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
                dateTime: event.startDateTime,
                labelInput: "Start ",
                label: "startDateTime",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
            <DateTime
              inputs={{
                dateTime: event.endDateTime,
                labelInput: "End ",
                label: "endDateTime",
              }}
              handleOnChangeInput={handleOnChangeInput}
            />
          </>
        )}

        {selectedTab == "REMINDER" && (
          <DateTime
            inputs={{
              dateTime: event.remindDateTime,
              labelInput: "Remind Time",
              label: "remindDateTime",
            }}
            handleOnChangeInput={handleOnChangeInput}
          />
        )}

        {selectedTab == "TASK" && (
          <DateTime
            inputs={{
              dateTime: event.taskDate,
              labelInput: "Task Date",
              label: "taskDate",
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
      </form>
    </div>
  );
}
