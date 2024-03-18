export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
