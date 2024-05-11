import { createContext } from "react";
export const EventsContext = createContext({
  events: [],
  setEvents: {},
  token: "",
  setToken: {},
  selectedStartDate: undefined,
  selectedEndDate: undefined,
  topics: [],
  setTopics: {},
  rightPanelState: [],
  setRightPanelState: {},
});
