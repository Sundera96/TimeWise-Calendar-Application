import { useEffect, useState } from "react";
import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3MiLCJzdWIiOiJzdW5kZXJhIiwiaWF0IjoxNzEwOTA5Mjg3LCJleHAiOjE3MTA5MjM2ODd9.jZEGYfMQjp6efT3JaFV41raIaHZ-uuJrSsqctHfWF3k";
function App() {
  return (
    <>
      <Header />
      <div className="Container">
        <EventsContext.Provider value={{ events: [], token: token }}>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </EventsContext.Provider>
      </div>
    </>
  );
}

export default App;
