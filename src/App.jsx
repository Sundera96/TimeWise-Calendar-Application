import { useState } from "react";
import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3MiLCJzdWIiOiJzdW5kZXJhIiwiaWF0IjoxNzEyMDEzNzU5LCJleHAiOjE3MTIwMjgxNTl9.s8FCTFsPFGXG4vASbgFBRNSiJ092VeN-yHfcgcHphVA";
function App() {
  const [events,setEvents] = useState([]);
  return (
    <>
      <Header />
      <div className="Container">
        <EventsContext.Provider value={{ events: events, setEvents:setEvents,token: token }}>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </EventsContext.Provider>
      </div>
    </>
  );
}

export default App;
