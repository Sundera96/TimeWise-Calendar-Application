import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/container.css";
import { EventsContext } from "./store/events-view-context";
import SignUpOrLogin from "./components/SignUpOrLogin";
import dayjs from "dayjs";
import { validateToken } from "./util/userRegistration";
import MainPanel from "./components/MainPanel";

function App() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);

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
            topics: [],
            setTopics: {},
            newTasks: [],
            setNewTasks: {},
          }}
        >
          {token === "" && <SignUpOrLogin />}
          {!(token === "") && <MainPanel />}
        </EventsContext.Provider>
      </div>
    </>
  );
}

export default App;
