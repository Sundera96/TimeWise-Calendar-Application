import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";

function App() {
  return (
    <>
      <Header />
      <div className="Container">
        <EventsContext.Provider
          value={{
            reminder: [
              {
                id: 100,
                type: "REMINDER",
                tag: "Default",
                title: "My First Reminder",
                remindDateTime: "08/03/2024 06:42:00",
                link: "This is the Http Link for Reminder",
              },
              {
                id: 101,
                type: "REMINDER",
                tag: "Default",
                title: "My Second Reminder",
                remindDateTime: "08/03/2024 06:45:00",
                link: "This is the Http Link for Reminder",
              },
            ],
            meeting: [
              {
                id: 102,
                type: "MEETING",
                tag: "Default",
                title: "My First Meeting",
                meetingStartDateTime: "08/03/2024 06:42:00",
                meetingEndDateTime: "08/03/2024 07:42:00",
                link: "This is the Http Link for Meeting",
              },
            ],
            task: [
              {
                id: 103,
                type: "TASK",
                tag: "Default",
                title: "My First Task",
                taskDate: "08/03/2024",
                finishDate: "",
                link: "This is the Http Link for Task",
              },
            ],
          }}
        >
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </EventsContext.Provider>
      </div>
    </>
  );
}

export default App;
