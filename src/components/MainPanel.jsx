import { useEffect, useState, useContext } from "react";
import CenterPanel from "./CenterPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { EventsContext } from "../store/events-view-context.jsx";
import dayjs from "dayjs";
import { fetchEvents, getRightPanelData } from "../util/query.js";

export default function MainPanel() {
  const eventsContext = useContext(EventsContext);
  //const [newTasks, setNewTasks] = useState([]);
  const [topics, setTopics] = useState(["DEFAULT"]);
  const [currentView, setCurrentView] = useState({
    viewDate: dayjs(),
    viewType: "MONTH",
  });
  const [todayDate, setTodayDate] = useState(dayjs());

  const [rightPanelState, setRightPanelState] = useState({
    currentTask: [],
    unFinishedTask: [],
    trackerProgress: [],
  });

  eventsContext.rightPanelState = rightPanelState;
  eventsContext.setRightPanelState = setRightPanelState;
  eventsContext.setTopics = setTopics;
  eventsContext.topics = topics;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs();
      if (now.get("date") !== todayDate.get("date")) {
        setTodayDate(now);
        // Fetch and set unfinished task
      }
    }, 60000); // Check every minute for current date
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await getRightPanelData(todayDate, eventsContext.token);
      setRightPanelState((prevState) => {
        return {
          currentTask: data.currentTask,
          unFinishedTask: data.unfinishedTask,
          trackerProgress: data.taskProgress,
        };
      });
    }
    getData();
  }, [todayDate]);

  useEffect(() => {
    fetchEvents(
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      eventsContext.setEvents,
      eventsContext.token
    );
  }, [currentView]);

  return (
    <>
      <LeftPanel />
      <CenterPanel
        currentView={currentView}
        setCurrentView={setCurrentView}
        todayDate={todayDate}
      />
      <RightPanel
        todayDate={todayDate}
        rightPanelState={rightPanelState}
        setRightPanelState={setRightPanelState}
      />
    </>
  );
}
