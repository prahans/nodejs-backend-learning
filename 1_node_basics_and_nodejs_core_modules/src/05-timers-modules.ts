// settimeout
// setinterval
// cleartimeout
// clearinterval
// setimmediate

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
    console.log(`setInterval tick ${count}`);
    if (count === 5) {
      clearTimeout(intervalId);
      console.log("setInverval stop");
    }
  }, 1000);
}

// runSetTimeoutExample();
// runClearTimeoutExample();
runSetIntervalExample();
