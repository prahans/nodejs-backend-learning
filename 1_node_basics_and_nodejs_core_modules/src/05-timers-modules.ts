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

function runTimerDemo() {
  runSetTimeoutExample();
}

runTimerDemo();
