// user registered
// send a welcome email
// write a log
// notify some other service

import { removeAllListeners } from "node:cluster";
import { EventEmitter } from "node:stream";

// emit one event -> listeners listen to this event do something
// .on() - register one listerner
// .once() - register one listerner that runs only one time
// .emit() - triggers an event and sends to the listeners

// const appEvents = new EventEmitter();

// type UserRegisterPayload = {
//   id: number;
//   email: string;
// };

// appEvents.on("user:registered", (user: UserRegisterPayload) => {
//   console.log(`email listerner: welcome email sent to this user ${user.email}`);
// });
// appEvents.on("user:registered", (user: UserRegisterPayload) => {
//   console.log(`log listerner: id : ${user.id},  email :  ${user.email}`);
// });

// appEvents.once("app.started", () => {
//   console.log("once listener: app started");
// });

// appEvents.on("login", () => {
//   console.log("user successfully login");
// });

// function registerUser() {
//   const user = {
//     id: 1,
//     email: "prahans@gmail.com",
//   };
//   console.log("user saved");
//   appEvents.emit("user:registered", user);
//   console.log("register user : event listerns completed");
// }

// appEvents.on("login", () => {
//   console.log("Update dashboard");
// });

// appEvents.on("login", () => {
//   console.log("Save login history");
// });

// appEvents.on("login", () => {
//   console.log("Send email");
// });

// appEvents.on("login", (name, age) => {
//   console.log("hello", name, "you are", age, "years old right");
// });
// emitter.on("info", (name, age) => {
//   console.log(`name: ${name}, age: ${age}`);
// });

// emitter.on("welcome", (msg) => {
//   console.log(msg);
// });

// appEvents.emit("app.started");
// appEvents.emit("login", "prahans", 22);
// registerUser();
// console.log(appEvents.listenerCount("login")); // 5
// console.log(appEvents.listeners("login"));
// [
//   [Function (anonymous)],
//   [Function (anonymous)],
//   [Function (anonymous)],
//   [Function (anonymous)],
//   [Function (anonymous)]
// ]

// const emitter = new EventEmitter();

// emitter.on("welcome", (msg) => {
//   console.log(msg);
// });

// emitter.on("login", () => {
//   console.log("Saving login history");
// });

// emitter.on("login", () => {
//   console.log("Updating dashboard");
// });

// emitter.on("user", (name, age) => {
//   console.log(`name: ${name}, age: ${age}`);
// });
// emitter.once("start", () => {
//   console.log("app started..");
// });
// emitter.on("order", () => {
//   console.log("order 1");
// });
// emitter.on("order", () => {
//   console.log("order 2");
// });
// emitter.on("order", () => {
//   console.log("order 3");
// });

// Exercise 1 (Easy)
// emitter.emit("welcome", "Welcome to Node.js");
// Exercise 2
// emitter.emit("login");
// Exercise 3
// emitter.emit("user", "Prahans", 22);
// Exercise 4 : Use once(). Emit "start" three times. It should print only one time.
// emitter.emit("start");
// emitter.emit("start");
// emitter.emit("start");
// Exercise 5 :Register three listeners. Print: emitter.listenerCount("order"); What number do you get?
// emitter.emit("order");
// console.log(emitter.listenerCount("order")); // 3

// Exercise 6 (Real World)
// Simulate an e-commerce order.

// When an "orderPlaced" event is emitted with an order object, create separate listeners that:

// Print Sending confirmation email...
// Print Updating inventory...
// Print Creating invoice...
// Print Logging analytics...
// All should receive the same order data.

// type OrderPayload = {
//   itemId: number;
//   itemName: string;
//   quantity: number;
//   user: {
//     userId: number;
//     name: string;
//     email: string;
//   };
// };

// emitter.on("orderPlace", (user: OrderPayload) => {
//   console.log(`Welcome ${user.user.name} to pizza.co`);
// });
// emitter.on("orderPlace", (user: OrderPayload) => {
//   console.log(`order have been placed on ${user.user.email}`);
// });
// emitter.on("orderPlace", (user: OrderPayload) => {
//   console.log(`you have ordered ${user.quantity} piece of ${user.itemName}`);
// });
// emitter.on("orderPlace", (user: OrderPayload) => {
//   console.log(`Thanks ${user.user.name} for buying from our company pizza.co`);
// });

// function registerOrder() {
//   const order: OrderPayload = {
//     itemId: 1,
//     itemName: "mushroom pizza",
//     quantity: 2,
//     user: {
//       userId: 1,
//       name: "prahans",
//       email: "prahans@gmail.com",
//     },
//   };
//   emitter.emit("orderPlace", order);
//   console.log("order completed");
// }

// registerOrder();

// emitter.on("login", () => {
//   console.log("First");
// });

// emitter.on("login", () => {
//   try {
//     throw new Error("Oops");
//   } catch (error) {
//     if (error instanceof Error)
//       console.error("Caught error in second listener:", error.message);
//   }
// });

// emitter.on("login", () => {
//   console.log("Third");
// });

// emitter.emit("error", new Error("Database failed"));

// emitter.emit("login");

// Exercise 1 : Predict the output:
// emitter.on("hello", () => console.log("A"));
// console.log("1");
// emitter.emit("hello");
// console.log("2");

// output will be
// 1
// A
// 2

// Exercise 2 : Predict the output:
// emitter.on("test", () => console.log("First"));
// emitter.on("test", () => console.log("Second"));
// emitter.emit("test");
// output will be
// First
// Second

// Exercise 3 : Predict the output:
// console.log("Before");
// emitter.emit("nothing");
// console.log("After");
// output will be
// Before
// After

// Exercise 4 : Predict the output:
// emitter.on("user", (name) => {
//   console.log(name);
// });
// emitter.emit("user", "Prahans");
// output will be
// Prahans

// Exercise 5 (Important) : What happens?
// emitter.on("task", () => {
//   console.log("A");
// });
// emitter.on("task", () => {
//   throw new Error("Boom");
// });
// emitter.on("task", () => {
//   console.log("C");
// });
// emitter.emit("task");
// Will C print?
// Explain why.
// no C will not print because on second task listener it throw a error so that the third task listener will not work any code after that will not work that why we have handle error using try and catch block then it will print c
// we can handle the error like this
// emitter.on("task", () => {
//   try{
//     throw new Error("Boom");
//   }catch(error){
//     if(error instanceof Error){
//       console.error("Caught error in second listener:", error.message);
//     }
//   }
// });

// emitter.on("task", () => {
//   console.log("A");
// });
// emitter.on("task", () => {
//   try {
//     throw new Error("Boom");
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Caught error in second listener:", error.message);
//     }
//   }
// });
// emitter.on("task", () => {
//   console.log("C");
// });
// emitter.emit("task");

// now in this case C will print because we are handling the error here in try and catch block
// the output will look like this
// A
// Caught error in second listener: Boom
// C

// const restaurant = new EventEmitter();

// function waiter(order: string) {
//   console.log(`Serving : ${order}`);
// }

// restaurant.off("order", waiter);
// restaurant.emit("order", "pizza");

// const emitter = new EventEmitter();

// emitter.on("login", () => console.log("A"));
// emitter.on("login", () => console.log("B"));
// emitter.on("login", () => console.log("C"));

// emitter.removeAllListeners("login");

// emitter.emit("login");

// 📝 Exercise 1 (Hands-on)
// Create a file:
// lesson3-part1.js

// Do the following:

// Create an EventEmitter.
// Create a named function welcomeUser.
// Register it for a "login" event.
// Emit "login" once.
// Remove the listener using off().
// Emit "login" again.
// Observe the output.
// Add three listeners to a "logout" event.
// Emit "logout" once.
// Call removeAllListeners("logout").
// Emit "logout" again.

const appEvent = new EventEmitter();

function welcomeUser(userName: string) {
  console.log(`welcome ${userName}`);
}

appEvent.on("login", welcomeUser);
appEvent.off("login", welcomeUser);
appEvent.on("login", welcomeUser);

appEvent.on("logout", () => {
  console.log("logout 1");
});
appEvent.on("logout", () => {
  console.log("logout 2");
});
appEvent.on("logout", () => {
  console.log("logout 3");
});

appEvent.removeAllListeners("logout");
appEvent.on("logout", () => {
  console.log("logout");
});

appEvent.on("login", () => {});
appEvent.on("logout", () => {});
appEvent.on("payment", () => {});

console.log(appEvent.eventNames()); //[ 'login', 'logout', 'payment' ]

for (let i = 0; i < 20; i++) {
  appEvent.on("login", () => {});
}

// (node:15428) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 login listeners added to [EventEmitter]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit

appEvent.emit("login", "prahans");
appEvent.emit("logout");
