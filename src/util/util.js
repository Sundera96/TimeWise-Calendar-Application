import dayjs from "dayjs";

export function getEventObj(eventType) {
  if (eventType === "REMINDER") {
    return {
      ["remind-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
      ["repeat-date"]: dayjs().format("YYYY-MM-DD"),
      ["type-tag"]: "REMINDER",
      ["priority"]: 1,
    };
  } else if (eventType === "MEETING") {
    return {
      ["start-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
      ["end-date-time"]: dayjs().format("YYYY-MM-DD HH:mm"),
      ["repeat-date"]: dayjs().format("YYYY-MM-DD"),
      ["type-tag"]: "MEETING",
      ["priority"]: 1,
    };
  } else if (eventType === "TASK") {
    return {
      ["task-date"]: dayjs().format("YYYY-MM-DD"),
      ["type-tag"]: "TASK",
      ["priority"]: 1,
    };
  } else {
    return { ["type-tag"]: "LINK", ["priority"]: 1 };
  }
}

export function getEventDateTime(event, type) {
  if (type === "REMINDER") {
    return event.remindDateTime;
  } else if (type === "MEETING") {
    return event.startDateTime;
  } else if (type === "TASK") {
    return event.taskDate;
  }
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDateStr(dateString) {
  // Split the input date string into year, month, and day
  const parts = dateString.split("-");
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
}

export function converDateToDateTimeStr(date) {
  // Split the input date string into year, month, and day
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function currMonthEndDate(currentDate) {
  const nextMonthFirstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const currentMonthLastDay = new Date(nextMonthFirstDay.getTime() - 1);
  return formatDate(currentMonthLastDay);
}

export function monthEndDate(currDate) {
  return new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
}

export function formatDateTime(str) {
  const date = new Date(str);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const dateTimeStr = `${day}-${month}-${year} ${hours}:${minutes}`;
  return dateTimeStr;
}

export function getRecurrenceCount(dateTimeStr1, dateTimeStr2) {
  const startDate = dayjs(dateTimeStr1);
  const endDate = dayjs(dateTimeStr2)
    .set("hour", startDate.get("hour"))
    .set("minute", startDate.get("minute"));
  return endDate.diff(startDate, "day");
}

export function groupingEventsForDisplay(listOfEvents) {
  console.log(listOfEvents);
  listOfEvents.forEach((item) => {
    if (item.eventType === "REMINDER") {
      item["sort-start-dayjs"] = dayjs(item["remindDateTime"]);
      item["sort-end-dayjs"] = dayjs(item["remindDateTime"]);
    } else if (item.eventType === "MEETING") {
      item["sort-start-dayjs"] = dayjs(item["startDateTime"]);
      item["sort-end-dayjs"] = dayjs(item["endDateTime"]);
    } else if (item.eventType === "TASK") {
      item["sort-start-dayjs"] = dayjs(item["taskDate"]);
      item["sort-end-dayjs"] = dayjs(item["taskDate"]);
    } else {
      item["sort-start-dayjs"] = dayjs(item["linkDateTime"]);
      item["sort-end-dayjs"] = dayjs(item["linkDateTime"]);
    }
  });
  listOfEvents.sort((item1, item2) => {
    return item1["sort-start-dayjs"].diff(item2["sort-start-dayjs"]) === 0
      ? item1["sort-end-dayjs"].diff(item2["sort-end-dayjs"])
      : item1["sort-start-dayjs"].diff(item2["sort-start-dayjs"]);
  });

  const lowestPillPixelHeight = 16;
  let currentPixel = 0;
  let startPixel;
  let endPixel;
  const listOfDivs = [];
  let listOfEventDivs = [];
  let i = 0;
  listOfEvents.forEach((event) => {
    const currStartPixel = calculatePixel(event["sort-start-dayjs"]);
    const currEndPixel =
      calculatePixel(event["sort-end-dayjs"]) - currStartPixel <
      lowestPillPixelHeight
        ? currStartPixel + lowestPillPixelHeight
        : calculatePixel(event["sort-end-dayjs"]);
    if (!startPixel) {
      startPixel = calculatePixel(event["sort-start-dayjs"]);
      endPixel = calculatePixel(event["sort-end-dayjs"]);
      if (endPixel - startPixel < 16) {
        endPixel = startPixel + lowestPillPixelHeight;
      }
    } else if (
      !(
        (startPixel >= currStartPixel && startPixel < currEndPixel) ||
        (endPixel > currStartPixel && endPixel < currEndPixel) ||
        (currStartPixel >= startPixel && currStartPixel < endPixel) ||
        (currEndPixel > startPixel && currEndPixel <= endPixel)
      )
    ) {
      listOfDivs.push({
        ["margin-top"]: startPixel - currentPixel,
        ["height"]: endPixel - startPixel,
        ["events-list"]: listOfEventDivs,
      });
      currentPixel = endPixel;
      startPixel = currStartPixel;
      endPixel = currEndPixel;
      listOfEventDivs = [];
    }
    if (currStartPixel < startPixel) {
      startPixel = currStartPixel;
    }
    if (currEndPixel > endPixel) {
      endPixel = currEndPixel;
    }
    listOfEventDivs.push({
      ...event,
      ["margin-top"]: currStartPixel - startPixel,
      ["height"]: currEndPixel - currStartPixel,
    });
  });

  if (listOfEventDivs.length != 0) {
    listOfDivs.push({
      ["margin-top"]: startPixel - currentPixel,
      ["height"]: endPixel - startPixel,
      ["events-list"]: listOfEventDivs,
    });
  }
  return listOfDivs;
}

function calculatePixel(date) {
  const pixel = 1536;
  const totalTimeMin = 24 * 60;
  return ((date.hour() * 60 + date.minute()) * pixel) / totalTimeMin;
}
