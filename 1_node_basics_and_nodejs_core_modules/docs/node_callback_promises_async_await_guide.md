# Callback in Node.js

> **Note:** A **callback** is a **JavaScript programming concept**, not a Node.js module. Node.js uses callbacks extensively, especially in its built-in modules like `fs`, `http`, `crypto`, and `dns`.

---

# What is a Callback?

A **callback** is a function that is passed as an argument to another function and is executed later.

Think of it like this:

> **"When you finish this task, call me."**

## Example

```javascript
function greet(name, callback) {
  console.log(`Hello ${name}`);

  callback();
}

function goodbye() {
  console.log("Goodbye!");
}

greet("John", goodbye);
```

### Output

```text
Hello John
Goodbye!
```

### Explanation

- `goodbye` is the callback function.
- `greet()` executes the callback after printing the greeting.

---

# Why Node.js Uses Callbacks

Node.js is **non-blocking**.

Instead of waiting for a slow operation (like reading a file or making a database request) to finish, Node.js continues executing other code.

### Without Callbacks

```text
Read file
(wait...)
(wait...)
(wait...)
Continue program
```

### With Callbacks

```text
Start reading file
Continue program
File finished reading
Run callback
```

This is one of the reasons Node.js performs so well with I/O operations.

---

# Basic Callback Example

```javascript
function calculate(a, b, callback) {
  const result = a + b;

  callback(result);
}

calculate(5, 10, function (result) {
  console.log(result);
});
```

### Output

```text
15
```

---

# Callback with Arrow Function

```javascript
calculate(20, 30, (result) => {
  console.log(result);
});
```

### Output

```text
50
```

---

# Real Node.js Example

One of the best examples of callbacks is the `fs` module.

```javascript
const fs = require("fs");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});

console.log("Reading file...");
```

Suppose `message.txt` contains:

```text
Hello Node.js
```

### Output

```text
Reading file...
Hello Node.js
```

### Why does this happen?

The message:

```text
Reading file...
```

appears before the file content because `fs.readFile()` is **asynchronous**.

Node.js starts reading the file, continues executing the next line of code, and only executes the callback after the file has finished loading.

---

# Anatomy of `fs.readFile()`

```javascript
fs.readFile(filename, encoding, callback);
```

Example:

```javascript
fs.readFile("notes.txt", "utf8", callback);
```

The callback receives two arguments:

```javascript
(err, data);
```

- `err` → Contains an error if something went wrong.
- `data` → Contains the file contents if successful.

---

# Error-First Callback Pattern

Node.js follows a standard convention called the **Error-First Callback Pattern**.

Most asynchronous callbacks look like this:

```javascript
function (err, result) {

}
```

Example:

```javascript
fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});
```

### If something goes wrong

```text
err  → Error object
data → undefined
```

### If everything succeeds

```text
err  → null
data → File contents
```

---

# Why Check Errors First?

## ❌ Bad

```javascript
fs.readFile("hello.txt", "utf8", (err, data) => {
  console.log(data);
});
```

If the file doesn't exist:

```text
undefined
```

---

## ✅ Better

```javascript
fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Something went wrong.");
    return;
  }

  console.log(data);
});
```

---

## ✅ Best

```javascript
fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log(data);
});
```

Using `err.message` provides a cleaner error message than logging the entire error object.

---

# Callback Example with `setTimeout()`

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Done");
}, 2000);

console.log("End");
```

### Output

```text
Start
End
Done
```

`setTimeout()` accepts a callback function and executes it after the specified delay.

---

# Callback Hell

Callbacks can become difficult to read when they are deeply nested.

```javascript
login(user, () => {
  getProfile(() => {
    getFriends(() => {
      getPosts(() => {
        console.log("Finished");
      });
    });
  });
});
```

This deeply nested structure is commonly called **Callback Hell** or the **Pyramid of Doom**.

### Problems

- Difficult to read
- Difficult to debug
- Difficult to maintain

---

# Modern Solution

Today, most Node.js applications use **Promises** or **Async/Await** instead of callbacks.

## Callback

```javascript
fs.readFile("hello.txt", "utf8", (err, data) => {
  console.log(data);
});
```

---

## Promise

```javascript
const fs = require("fs/promises");

fs.readFile("hello.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

---

## Async/Await

```javascript
const fs = require("fs/promises");

async function readFile() {
  try {
    const data = await fs.readFile("hello.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

readFile();
```

Today, you'll see **Async/Await** in most modern Node.js projects because it is easier to read and maintain.

---

# When Should You Use Callbacks?

You should understand callbacks because:

- Many Node.js core APIs still use them.
- Older Node.js libraries rely on callbacks.
- Understanding callbacks makes it much easier to learn Promises and Async/Await.

### For new projects, prefer:

1. `async/await`
2. Promises
3. Callbacks (mainly for legacy code or APIs that require them)

---

# Summary

| Concept             | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| Callback            | A function passed to another function that is executed later.  |
| Why Node.js uses it | To perform non-blocking asynchronous operations.               |
| Standard Pattern    | `(err, result) => {}` (Error-First Callback Pattern).          |
| Common Examples     | `fs.readFile()`, `setTimeout()`, and many legacy Node.js APIs. |
| Main Drawback       | Deep nesting can lead to Callback Hell.                        |
| Modern Alternative  | Promises and `async/await`.                                    |
