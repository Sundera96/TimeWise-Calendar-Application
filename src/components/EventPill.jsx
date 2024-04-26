import dayjs from "dayjs";
import "../css/eventPill.css";
import { useEffect, useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
import { getEventDateTime } from "../util/util.js";
import { notification } from "antd";
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

  console.log("Event Pill");
  console.log(event.eventType);
  console.log(event.eventDateTime);

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
  } else if (event.eventType === "TASK") {
    useEffect(() => {
      const date = dayjs();
      if (date.format("YYYY-MM-DD") > eventDateTime.format("YYYY-MM-DD")) {
        eventContext.setRightPanelTask({
          unfinishedTask: eventContext.unfinishedTask.concat(event),
          routineTask: eventContext.routineTask,
        });
      } else {
        const interval = setInterval(() => {
          console.log("iss checkig");
          if (date.format("YYYY-MM-DD") > eventDateTime.format("YYYY-MM-DD")) {
            openNotification();
            clearInterval(interval);
            eventContext.setRightPanelTask({
              unfinishedTask: eventContext.unfinishedTask.concat(event),
              routineTask: eventContext.routineTask,
            });
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
