import dayjs from "dayjs";

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
