import { useEffect, useState } from "react";
import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";
import SignUpOrLogin from "./components/SignUpOrLogin";
import dayjs from "dayjs";
import { validateToken } from "./util/userRegistration";

function App() {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState("");
  const [topics, setTopics] = useState(["DEFAULT"]);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("timewise-token");
    async function validate() {
      if (localStorageToken && localStorageToken != "") {
        try {
          await validateToken(localStorageToken);
          setToken(localStorageToken);
        } catch (e) {
          setToken("");
          localStorage.removeItem("timewise-token");
        }
      }
    }
    validate();
  }, []);

  return (
    <>
      <Header />
      <div className="Container">
        <EventsContext.Provider
          value={{
            events: events,
            setEvents: setEvents,
            token: token,
            setToken: setToken,
            selectedStartDate: dayjs().set("date", 1).format("YYYY-MM-DD"),
            selectedEndDate: dayjs().endOf("month").format("YYYY-MM-DD"),
            topics: topics,
            setTopics: setTopics,
            unfinishedTask: [],
            routineTask: [],
          }}
        >
          {token === "" && <SignUpOrLogin />}
          {token !== "" && (
            <>
              <LeftPanel />
              <CenterPanel />
              <RightPanel />
            </>
          )}
        </EventsContext.Provider>
      </div>
    </>
  );
}

export default App;
