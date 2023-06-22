import { type EventHandler } from "react";

export const preventDefaultEvent: EventHandler<any> = (event) => {
  event.preventDefault();
};
