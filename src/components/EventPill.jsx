import dayjs from "dayjs";
import "../css/eventPill.css";
import { useEffect } from "react";
import { getEventDateTime } from "../util/util.js";
import { notification } from "antd";
export default function EventPill({ event, onClick }) {
  const [api] = notification.useNotification();
  let eventDateTime = dayjs(
    getEventDateTime(event, event.eventType),
    "YYYY-MM-DD HH:mm"
  );

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
