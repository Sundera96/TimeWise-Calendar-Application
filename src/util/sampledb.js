export default function getViewEvents() {
  const listOfEvents = [];
  let rObj1 = {
    tag: "REMINDER",
    tag: "Default",
    title: "My First Reminder",
    remindDateTime: "08/03/2024 06:42:00",
    link: "This is the Http Link for Reminder",
  };

  let mObj1 = {
    tag: "MEETING",
    tag: "Default",
    title: "My First Meeting",
    meetingStartDateTime: "08/03/2024 06:42:00",
    meetingEndDateTime: "08/03/2024 07:42:00",
    link: "This is the Http Link for Meeting",
  };

  let tObj1 = {
    tag: "TASK",
    tag: "Default",
    title: "My First Task",
    taskDate: "08/03/2024",
    finishDate: "",
    link: "This is the Http Link for Task",
  };
  listOfEvents.push(rObj1);
  listOfEvents.push(mObj1);
  listOfEvents.push(tObj1);
  return listOfEvents;
}
