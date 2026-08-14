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

appEvents.on("user:registered", (user: UserRegisterPayload) => {
  console.log(`email listerner: welcome email sent to this user ${user.email}`);
});
appEvents.on("user:registered", (user: UserRegisterPayload) => {
  console.log(`log listerner: id : ${user.id},  email :  ${user.email}`);
});

appEvents.once("app.started", () => {
  console.log("once listener: app started");
});

appEvents.on("login", () => {
  console.log("user successfully login");
});

function registerUser() {
  const user = {
    id: 1,
    email: "prahans@gmail.com",
  };
  console.log("user saved");
  appEvents.emit("user:registered", user);
  console.log("register user : event listerns completed");
}

appEvents.emit("app.started");
appEvents.emit("login");

registerUser();
