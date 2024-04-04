import "../css/eventInput.css";
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
        return {
          ...prevData,
          ["remind-date-time"]: new Date(),
          ["type-tag"]: inputValue,
        };
      });
    } else if (inputValue === "MEETING") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["start-date-time"]: new Date(),
          ["end-date-time"]: new Date(),
          ["type-tag"]: inputValue,
        };
      });
    } else if (inputValue === "TASK") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["task-date"]: new Date(),
          ["type-tag"]: inputValue,
        };
      });
    } else if (inputValue === "LINK") {
      setEvent((prevData) => {
        return {
          ...prevData,
          ["type-tag"]: inputValue,
        };
      });
    }
    setSelectedTab(inputValue);
  }

  function handleOnChangeInput(label, value) {
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
  console.log("Reminder");
  console.log(event["remind-date-time"]);

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
