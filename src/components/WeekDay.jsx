import "../css/week-day.css";
import { groupingEventsForDisplay } from "../util/util";
import { useContext, useState, useRef } from "react";
import { updateEvent, fetchEvent } from "../util/query.js";
import { EventsContext } from "../store/events-view-context.jsx";
import EventModal from "../components/EventModal.jsx";
export default function WeekDay({ events }) {
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
    const eventContextData = await updateEvent(
      modalEvent,
      eventsContext.token,
      eventsContext.selectedStartDate,
      eventsContext.selectedEndDate,
      link,
      eventsContext.events
    );
    eventsContext.setEvents(eventContextData);
    dialog.current.close();
  }

  function handleOnClose() {
    dialog.current.close();
  }

  const divsOfEvents = groupingEventsForDisplay(events);
  return (
    <>
      <EventModal
        ref={dialog}
        onClick={handleSaveModal}
        eventData={modalEvent}
        setEventData={setModalEvent}
        handleOnClose={handleOnClose}
      />
      <div className="week-day">
        {divsOfEvents.map((item, index) => (
          <div
            className="week-pills"
            key={index}
            style={{ marginTop: item["margin-top"], height: item["height"] }}
          >
            {item["events-list"].map((event, idx) => (
              <div
                onClick={() => {
                  handleOnClickEventPill(event.links[0].href);
                }}
                className={`week-pill ${event.eventType}`}
                key={idx}
                style={{
                  marginTop: event["margin-top"],
                  height: event["height"],
                  width: "100%",
                }}
              >
                <p>{event.title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
