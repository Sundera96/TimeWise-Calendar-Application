import "../css/rightPanel.css";
import MyList from "./MyList";
import { useContext, useState, useRef } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import dayjs from "dayjs";
import EventModal from "./EventModal.jsx";
import { updateEvent, fetchEvent } from "../util/query.js";
import { useEffect } from "react";
// const items = [
//   {
//     key: "MISSED",
//     label: "MISSED",
//   },
//   {
//     key: "CURRENT",
//     label: "CURRENT",
//   },
//   {
//     key: "COMPLETED",
//     label: "COMPLETED",
//   },
// ];
export default function RightPanel() {
  const [modalEvent, setModalEvent] = useState({
    title: "",
    topic: "",
  });
  const eventsContext = useContext(EventsContext);
  const [eventObjs, setEventObjs] = useState({
    unfinishedTask: [],
    routineTask: [],
  });
  eventsContext.setRightPanelTask = setEventObjs;

  useEffect(() => {
    setEventObjs({
      unfinishedTask: [],
      routineTask: [],
    });
  }, []);
  const dialog = useRef();
  async function handleOnClickEventPill(link, caller) {
    if (!caller) {
      const data = await fetchEvent(link, eventsContext.token);
      setModalEvent(data);
      dialog.current.showModal();
    } else {
      console.log("Task should be updated");
    }
  }

  async function handleSaveModal(events, link) {
    events.preventDefault();
    const eventContextData = await updateEvent(
      modalEvent,
      eventsContext.token,
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      link,
      eventsContext.events
    );
    eventsContext.events = eventContextData;
    dialog.current.close();
  }

  async function handleCheckBox(isChecked, resourceLink) {
    let taskExpiryDate;
    if (isChecked) {
      taskExpiryDate = dayjs().format("YYYY-MM-DD HH:mm");
    } else {
      taskExpiryDate = null;
    }
    let data = await fetchEvent(resourceLink, eventsContext.token);
    data = { ...data, ["expiry-date-time"]: taskExpiryDate };
    const eventContextData = await updateEvent(
      data,
      eventsContext.token,
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      data["update"].href,
      eventsContext.events
    );
    eventsContext.events = eventContextData;
    eventsContext.unfinishedTask = eventsContext.unfinishedTask.filter(
      (task) => {
        return task.eventId !== data.eventId;
      }
    );
    setEventObjs({
      unfinishedTask: eventsContext.unfinishedTask,
      routineTask: eventObjs.routineTask,
    });
  }

  function handleOnClose() {
    dialog.current.close();
  }

  function getCurrentTaskDataFromContext() {
    const data = eventsContext.events.filter((item) => {
      return (
        item.eventType === "TASK" &&
        item.taskDate === dayjs().format("YYYY-MM-DD")
      );
    });
    return data;
  }

  return (
    <div className="RightPanel">
      <EventModal
        ref={dialog}
        onClick={handleSaveModal}
        eventData={modalEvent}
        setEventData={setModalEvent}
        handleOnClose={handleOnClose}
      />
      <MyList
        title={"CURRENT TASK"}
        data={getCurrentTaskDataFromContext()}
        handleOnClickEventPill={handleOnClickEventPill}
        handleCheckBox={handleCheckBox}
      ></MyList>
      <MyList
        title={"UNFINISHED TASK"}
        data={eventObjs.unfinishedTask}
        handleOnClickEventPill={handleOnClickEventPill}
        handleCheckBox={handleCheckBox}
      ></MyList>
      <MyList
        title={"ROUTINE TRACKER"}
        data={eventObjs.routineTask}
        handleOnClickEventPill={handleOnClickEventPill}
      ></MyList>
    </div>
  );
}
