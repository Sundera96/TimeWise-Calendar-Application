import dayjs from "dayjs";
import { getRecurrenceCount } from "./util";

export async function fetchEvent(link, token) {
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export function fetchEvents(startDate, endDate, setEventsState, token) {
  fetch(`http://localhost:8080/event/${startDate}/${endDate}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setEventsState(data);
    });
}

export async function addEvent(event, token, startDate, endDate) {
  const link = "http://localhost:8080/event/";
  event = {
    ...event,
    ["selected-start-date"]: startDate,
    ["selected-end-date"]: endDate,
  };
  console.log("adding query");
  if (event["type-tag"] === "REMINDER") {
    event = {
      ...event,
      ["remind-date-time"]: event["remind-date-time"],
      ["recurrence-count"]:
        getRecurrenceCount(event["remind-date-time"], event["repeat-date"]) + 1,
    };
    console.log("Recurrence");
    console.log(event);
  } else if (event["type-tag"] === "MEETING") {
    event = {
      ...event,
      ["start-date-time"]: event["start-date-time"],
      ["end-date-time"]: event["end-date-time"],
      ["recurrence-count"]:
        getRecurrenceCount(event["start-date-time"], event["repeat-date"]) + 1,
    };
    console.log("Meeting about to get added");
    console.log(event);
  } else if (event["type-tag"] === "TASK") {
    console.log(event["task-date"]);
    event = {
      ...event,
      ["task-date"]: event["task-date"],
    };
  } else if (event["type-tag"] === "LINK") {
    event = {
      ...event,
      ["link-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
    };
  }
  console.log(event);
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export async function updateEvent(event, token, startDate, endDate, link) {
  event = {
    ...event,
    ["selected-start-date"]: startDate,
    ["selected-end-date"]: endDate,
  };
  console.log("adding query");
  if (event["type-tag"] === "REMINDER") {
    event = {
      ...event,
      ["remind-date-time"]: event["remind-date-time"],
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "MEETING") {
    event = {
      ...event,
      ["start-date-time"]: event["start-date-time"],
      ["end-date-time"]: event["end-date-time"],
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "TASK") {
    event = {
      ...event,
      ["task-date"]: event["task-date"],
    };
  } else if (event["type-tag"] === "LINK") {
    event = {
      ...event,
      ["link-date-time"]:
        event["link-date-time"] || dayjs().format("YYYY-MM-DD HH:mm"),
    };
  }
  console.log(event);
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();
  data = data[0];
  if (!data) {
    return null;
  }
  // events = events.filter((item) => {
  //   return item.eventId !== data.eventId;
  // });
  return data;
}

export async function getAllTopics(token, setTopicState) {
  fetch(`http://localhost:8080/event/tags`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.includes("DEFAULT")) {
        data = data.concat("DEFAULT");
      }
      setTopicState(data);
    });
}

export async function getRightPanelData(date, token) {
  const response = await fetch(
    `http://localhost:8080/event/tasks/${date.format("YYYY-MM-DD")}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
