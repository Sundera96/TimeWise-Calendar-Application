import { createContext } from "react";
export const EventsContext = createContext({
  events: [],
  setEvents: {},
  token: "",
  selectedStartDate: undefined,
  selectedEndDate: undefined,
});
