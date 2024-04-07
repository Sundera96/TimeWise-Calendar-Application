import { useState } from "react";
import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";
import { formatDate, monthEndDate } from "./util/util";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3MiLCJzdWIiOiJzdW5kZXJhIiwiaWF0IjoxNzEyNDUyODMyLCJleHAiOjE3MTI0NjcyMzJ9.uDe1fASkPULcgZC2jetck0CzGKNIJASo-DMSTOhCDPY";
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
            selectedStartDate: formatDate(new Date(new Date().setDate(1))),
            selectedEndDate: formatDate(monthEndDate(new Date())),
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
