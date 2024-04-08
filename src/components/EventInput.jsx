import "../css/eventInput.css";
import dayjs from "dayjs";
import TabButton from "./TabButton.jsx";
import EventFormFields from "./EventFormFields.jsx";
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
        const data = {
          ...prevData,
          ["remind-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
          ["repeat-date"]: dayjs().format("YYYY-MM-DD"),
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
        return data;
      });
    } else if (inputValue === "MEETING") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["start-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
          ["end-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
          ["repeat-date"]: dayjs().format("YYYY-MM-DD"),
          ["type-tag"]: inputValue,
          ["priority"]: 1,
        };
      });
    } else if (inputValue === "TASK") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["task-date"]: dayjs().format("YYYY-MM-DD"),
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
          populateRecurrence={true}
        />
      </form>
    </div>
  );
}
