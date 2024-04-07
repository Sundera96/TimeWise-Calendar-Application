import "../css/eventInput.css";
import TabButton from "./TabButton.jsx";
import EventFormFields from "./EventFormFields.jsx";
import { converDateToDateTimeStr } from "../util/util.js";
export default function EventInput({
  event,
  setEvent,
  selectedTab,
  setSelectedTab,
  onHandleSubmit,
}) {
  function handleOnClick(inputValue) {
    if (inputValue === "REMINDER") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["remind-date-time"]: converDateToDateTimeStr(new Date()),
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
      });
    } else if (inputValue === "MEETING") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["start-date-time"]: converDateToDateTimeStr(new Date()),
          ["end-date-time"]: converDateToDateTimeStr(new Date()),
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
      });
    } else if (inputValue === "TASK") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["task-date"]: converDateToDateTimeStr(new Date()).substring(0, 10),
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
      });
    } else if (inputValue === "LINK") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
      });
    }
    setSelectedTab(inputValue);
  }

  function handleOnChangeInput(label, value) {
    console.log("handle change");
    console.log(value);
    setEvent((prevData) => {
      return {
        ...prevData,
        [label]: value,
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
        <EventFormFields
          event={event}
          handleOnChangeInput={handleOnChangeInput}
          handleEditorChangeInput={handleEditorChangeInput}
          selectedTab={selectedTab}
        />
      </form>
    </div>
  );
}
