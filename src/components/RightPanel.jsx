import "../css/rightPanel.css";
import MyList from "./MyList";
import { useContext, useState, useRef, useEffect } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import dayjs from "dayjs";
import EventModal from "./EventModal.jsx";
import { updateEvent, fetchEvent } from "../util/query.js";
import ProgressBarPanel from "./ProgressbarPanel.jsx";
export default function RightPanel({
  todayDate,
  rightPanelState,
  setRightPanelState,
}) {
  console.log(rightPanelState);

  const [modalEvent, setModalEvent] = useState({
    title: "",
    topic: "",
  });
  const eventsContext = useContext(EventsContext);
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
    await updateEvent(
      modalEvent,
      eventsContext.token,
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      link
    );
    eventsContext.setEvents(eventsContext.events.concat([]));
    dialog.current.close();
  }

  /**
   *
   * Need to complete this logic
   */
  async function handleCheckBox(isChecked, resourceLink, caller) {
    let taskExpiryDate;
    if (isChecked) {
      taskExpiryDate = dayjs().format("YYYY-MM-DD HH:mm");
    } else {
      taskExpiryDate = null;
    }
    let data = await fetchEvent(resourceLink, eventsContext.token);
    data = { ...data, ["expiry-date-time"]: taskExpiryDate };
    await updateEvent(
      data,
      eventsContext.token,
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      data["update"].href
    );
    if (isChecked && caller === "UNFINISHEDTASK") {
      setRightPanelState((prevState) => {
        return {
          ...prevState,
          ["unFinishedTask"]: prevState.unFinishedTask.filter((item) => {
            return item.eventId !== data["event-id"];
          }),
        };
      });
    } else if (isChecked && caller === "CURRENTTASK") {
      const { currentTaskProgress, remainingTaskProgress } =
        rightPanelState.trackerProgress.reduce(
          (accumulator, item) => {
            if (item.seriesId === data["series-id"]) {
              accumulator.currentTaskProgress.push(item);
            } else {
              accumulator.remainingTaskProgress.push(item);
            }
            return accumulator;
          },
          { currentTaskProgress: [], remainingTaskProgress: [] }
        );
      setRightPanelState((prevState) => {
        return {
          ...prevState,
          ["currentTask"]: prevState.currentTask.filter((item) => {
            return item.eventId !== data["event-id"];
          }),
          ["trackerProgress"]: remainingTaskProgress.concat({
            ...currentTaskProgress[0],
            ["completedTask"]: currentTaskProgress[0].completedTask + 1,
          }),
        };
      });
    }
  }

  function handleOnClose() {
    dialog.current.close();
  }

  // Make this static
  function getCurrentTask() {
    return rightPanelState.currentTask;
  }

  function getCurrentUnfinishedTask() {
    return rightPanelState.unFinishedTask;
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
        caller={"CURRENTTASK"}
        data={getCurrentTask()}
        handleOnClickEventPill={handleOnClickEventPill}
        handleCheckBox={handleCheckBox}
      ></MyList>
      <MyList
        title={"UNFINISHED TASK"}
        caller={"UNFINISHEDTASK"}
        data={getCurrentUnfinishedTask()}
        handleOnClickEventPill={handleOnClickEventPill}
        handleCheckBox={handleCheckBox}
      ></MyList>
      <ProgressBarPanel
        title={"Progress"}
        data={rightPanelState.trackerProgress}
      ></ProgressBarPanel>
    </div>
  );
}
