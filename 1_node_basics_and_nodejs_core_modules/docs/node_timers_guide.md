# Timers Module (`node:timers`)

The **Timers module** is a built-in Node.js module that allows you to **schedule code execution** after a delay or repeatedly at fixed intervals.

Although the timer functions are available globally (you usually don't need to import them), they are implemented by the **`node:timers`** module.

```js
import {
  setTimeout,
  setInterval,
  setImmediate,
  clearTimeout,
  clearInterval,
  clearImmediate,
} from "node:timers";
```

or

```js
const {
  setTimeout,
  setInterval,
  setImmediate,
  clearTimeout,
  clearInterval,
  clearImmediate,
} = require("node:timers");
```

> **Note:** In most Node.js applications, you'll simply use the global timer functions without importing them.

---

# Why Use Timers?

Timers allow you to:

- Delay code execution.
- Run tasks repeatedly.
- Schedule asynchronous operations.
- Retry failed operations.
- Create polling systems.
- Build countdowns and intervals.

---

# Core Concepts

## Event Loop

Timers **do not guarantee exact execution time**.

Instead, they tell Node.js:

> "Run this callback **after at least** this amount of time."

If the event loop is busy, the callback runs later.

```js
setTimeout(() => {
  console.log("Executed");
}, 1000);
```

The callback executes **after at least 1 second**.

---

## Timer Object

Unlike browsers, Node.js returns a **Timeout object**.

```js
const timer = setTimeout(() => {
  console.log("Hello");
}, 1000);

console.log(timer);
```

You can use this object to cancel or manage the timer.

---

# Most Used Methods

---

## `setTimeout()`

Runs a callback **once** after a specified delay.

```js
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);
```

Output (after 2 seconds)

```text
Hello after 2 seconds
```

---

### Passing Arguments

```js
setTimeout(
  (name) => {
    console.log(`Hello ${name}`);
  },
  1000,
  "John",
);
```

Output

```text
Hello John
```

---

## `clearTimeout()`

Cancels a timeout before it executes.

```js
const timer = setTimeout(() => {
  console.log("Won't run");
}, 3000);

clearTimeout(timer);
```

Nothing is printed.

---

## `setInterval()`

Runs a callback repeatedly.

```js
setInterval(() => {
  console.log("Running...");
}, 1000);
```

Output

```text
Running...
Running...
Running...
...
```

---

## `clearInterval()`

Stops an interval.

```js
const interval = setInterval(() => {
  console.log("Tick");
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  console.log("Stopped");
}, 5000);
```

Output

```text
Tick
Tick
Tick
Tick
Stopped
```

---

## `setImmediate()`

Schedules a callback to run **after the current I/O operations** and before the next event loop iteration.

```js
setImmediate(() => {
  console.log("Immediate");
});

console.log("First");
```

Output

```text
First
Immediate
```

`setImmediate()` is useful when you want to execute code **as soon as possible**, but not immediately on the current call stack.

---

## `clearImmediate()`

Cancels an immediate callback.

```js
const immediate = setImmediate(() => {
  console.log("Won't run");
});

clearImmediate(immediate);
```

---

# Timer Execution Order

Consider this example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

console.log("End");
```

Possible output

```text
Start
End
Timeout
Immediate
```

or

```text
Start
End
Immediate
Timeout
```

> Outside of I/O callbacks, the order between `setTimeout(..., 0)` and `setImmediate()` is **not guaranteed**.

---

# `setTimeout()` vs `setInterval()`

| `setTimeout()`                | `setInterval()`           |
| ----------------------------- | ------------------------- |
| Executes once                 | Executes repeatedly       |
| Better for one-time delays    | Better for repeated tasks |
| Easier to control for retries | Good for periodic updates |

---

# `setTimeout()` vs `setImmediate()`

| `setTimeout(fn, 0)`                | `setImmediate()`            |
| ---------------------------------- | --------------------------- |
| Runs after the timers phase        | Runs during the check phase |
| Can be delayed by timer scheduling | Runs after I/O callbacks    |
| Order is not always predictable    | Useful after I/O operations |

---

# Timers Promises API

Node.js also provides a Promise-based timers API.

```js
import { setTimeout } from "node:timers/promises";
```

Instead of callbacks:

```js
import { setTimeout } from "node:timers/promises";

await setTimeout(2000);

console.log("2 seconds later");
```

Pass a value:

```js
const message = await setTimeout(1000, "Hello");

console.log(message);
```

Output

```text
Hello
```

---

# Real-World Examples

## Delay a Task

```js
console.log("Loading...");

setTimeout(() => {
  console.log("Finished!");
}, 3000);
```

---

## Countdown

```js
let count = 5;

const timer = setInterval(() => {
  console.log(count);

  count--;

  if (count < 0) {
    clearInterval(timer);
    console.log("Go!");
  }
}, 1000);
```

Output

```text
5
4
3
2
1
0
Go!
```

---

## Retry an Operation

```js
function retry() {
  console.log("Trying again...");

  setTimeout(retry, 5000);
}

retry();
```

---

## Poll an API

```js
const interval = setInterval(async () => {
  console.log("Checking for updates...");
}, 10000);

// Later...
clearInterval(interval);
```

---

## Schedule Cleanup

```js
setImmediate(() => {
  console.log("Cleaning resources...");
});
```

---

# Best Practices

- Use `setTimeout()` for one-time delays.
- Use `setInterval()` only for repeated tasks.
- Always call `clearInterval()` when an interval is no longer needed.
- Prefer recursive `setTimeout()` over `setInterval()` if each task must finish before scheduling the next one.
- Use `setImmediate()` for work that should run after the current I/O cycle.
- For modern asynchronous code, consider `node:timers/promises` with `async/await`.

---

# Cheat Sheet

| Method                 | Description                      |
| ---------------------- | -------------------------------- |
| `setTimeout()`         | Run once after a delay           |
| `clearTimeout()`       | Cancel a timeout                 |
| `setInterval()`        | Run repeatedly                   |
| `clearInterval()`      | Stop an interval                 |
| `setImmediate()`       | Run after current I/O operations |
| `clearImmediate()`     | Cancel an immediate callback     |
| `node:timers/promises` | Promise-based timer API          |

---

# Summary

The **Timers module** provides the foundation for scheduling work in Node.js. While the timer functions are available globally, understanding how they interact with the **event loop** is important for writing efficient asynchronous applications.

In day-to-day development, you'll most often use:

- `setTimeout()` – Execute code once after a delay.
- `clearTimeout()` – Cancel a scheduled timeout.
- `setInterval()` – Execute code repeatedly.
- `clearInterval()` – Stop a repeating task.
- `setImmediate()` – Schedule work after the current I/O cycle.
- `node:timers/promises` – Use timers with `async/await`.
