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
    monthDateState.setCurrentDate(dayjs(monthDateState.currentDate));
    dialog.current.close();
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
      ></MyList>
      <MyList
        title={"UNFINISHED TASK"}
        data={eventObjs.unfinishedTask}
        handleOnClickEventPill={handleOnClickEventPill}
      ></MyList>
      <MyList
        title={"ROUTINE TRACKER"}
        data={eventObjs.routineTask}
        handleOnClickEventPill={handleOnClickEventPill}
      ></MyList>
    </div>
  );
}
