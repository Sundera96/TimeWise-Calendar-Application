import "../css/rightPanel.css";
import MyList from "./MyList";
import { useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import dayjs from "dayjs";
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
export default function CenterPanel() {
  const eventsContext = useContext(EventsContext);

  function getCurrentTaskDataFromContext() {
    console.log("R u Executing");
    const data = eventsContext.events.filter((item) => {
      return (
        item.eventType === "TASK" &&
        item.taskDate === dayjs().format("YYYY-MM-DD")
      );
    });
    console.log(data);
    return data;
  }

  function getUncompletedTask() {
    return [];
  }
  return (
    <div className="RightPanel">
      <MyList
        title={"CURRENT TASK"}
        data={getCurrentTaskDataFromContext()}
      ></MyList>
      <MyList title={"UNCOMPLETED TASK"} data={getUncompletedTask()}></MyList>
      <MyList title={"Routine Tracker"} data={getUncompletedTask()}></MyList>
    </div>
  );
}
