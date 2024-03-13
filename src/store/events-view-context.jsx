import { createContext } from "react";
export const EventsContext = createContext({
  reminder: [],
  meeting: [],
  task: [],
});
