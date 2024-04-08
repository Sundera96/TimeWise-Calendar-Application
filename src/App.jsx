import { useState } from "react";
import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";
import dayjs from "dayjs";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3MiLCJzdWIiOiJzdW5kZXJhIiwiaWF0IjoxNzEyNjA3ODY4LCJleHAiOjE3MTI2MjIyNjh9.Qg-Fm_hpP2f335_d4zbgXfYe-kphk_2Op13D_NnguHo";
function App() {
  const [events, setEvents] = useState([]);
  return (
    <>
      <Header />
      <div className="Container">
        <EventsContext.Provider
          value={{
            events: events,
            setEvents: setEvents,
            token: token,
            selectedStartDate: dayjs().format("YYYY-MM-DD"),
            selectedEndDate: dayjs().endOf("month").format("YYYY-MM-DD"),
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
