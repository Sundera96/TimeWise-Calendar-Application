import dayjs from "dayjs";
import "../css/eventPill.css";
import { useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import { getEventDateTime } from "../util/util.js";
import { notification } from "antd";
import notifySound from "../assets/sound/bubble-sound-43207.mp3";
export default function EventPill({ event, onClick }) {
  const eventContext = useContext(EventsContext);
  const [api] = notification.useNotification();
  let eventDateTime;
  if (event.eventType !== "TASK") {
    eventDateTime = dayjs(
      getEventDateTime(event, event.eventType),
      "YYYY-MM-DD HH:mm"
    );
  } else {
    eventDateTime = dayjs(
      getEventDateTime(event, event.eventType),
      "YYYY-MM-DD"
    );
  }

  const openNotification = () => {
    notification.info({
      message: `Event ${event.eventType} Notification`,
      description: `Event ${event.title} is happening now!`,
      onClick: () => {
        // Handle click event
        onClick(event.links[0].href);
      },
      duration: 7,
    });
  };

  if (event.eventType === "REMINDER" || event.eventType === "MEETING") {
    useEffect(() => {
      if (dayjs().diff(eventDateTime) < 0) {
        const interval = setInterval(() => {
          const now = dayjs();
          console.log("iss checkig");
          if (now.diff(eventDateTime) > 0) {
            new Audio(notifySound).play();
            openNotification();
            clearInterval(interval);
          }
        }, 30000);
        return () => clearInterval(interval);
      }
    }, [event]);
  }

  return (
    <div
      key={`${event.eventId}`}
      className={`EventPill ${event.eventType}`}
      onClick={() => {
        onClick(event.links[0].href);
      }}
    >
      <p>{event.title}</p>
    </div>
  );
}
