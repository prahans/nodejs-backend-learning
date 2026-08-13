// user registered
// send a welcome email
// write a log
// notify some other service

import { EventEmitter } from "node:stream";

// emit one event -> listeners listen to this event do something
// .on() - register one listerner
// .once() - register one listerner that runs only one time
// .emit() - triggers an event and sends to the listeners

const appEvents = new EventEmitter();

type UserRegisterPayload = {
  id: number;
  email: string;
};
