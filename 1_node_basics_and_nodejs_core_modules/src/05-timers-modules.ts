// settimeout
// setinterval
// cleartimeout
// clearinterval
// setimmediate

import { error } from "node:console";
import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeoutExample(): void {
  console.log("1. settimeout example started");
  setTimeout(() => {
    console.log("2. this runs after 1 second");
  }, 1000);
  console.log("3. this run immediately. node doesn't wait");
}

function runClearTimeoutExample() {
  const timerId = setTimeout(() => {
    console.log("this message will not run");
  }, 2000);
  clearTimeout(timerId);
  console.log("4. cleartimeout cancelled the 2 second timer");
}

function runSetIntervalExample() {
  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    console.log(`5. setInterval tick ${count}`);
    if (count === 5) {
      clearTimeout(intervalId);
      console.log("setInverval stop");
    }
  }, 1000);
}

function runSetImmediateExample() {
  setImmediate(() => {
    console.log("setImmediate callback");
  });

  console.log("6. synchronous code after setImmediate");
}

async function runPromiseTimerExample() {
  console.log("7. waiting for promise based timer");
  await sleep(1500);
  console.log("10. promised based timer finishes after 1.5 second");
}

runSetTimeoutExample();
runClearTimeoutExample();
runSetIntervalExample();
runSetImmediateExample();
runPromiseTimerExample().catch((error: unknown) =>
  console.error("timer based demo failed", error),
);
