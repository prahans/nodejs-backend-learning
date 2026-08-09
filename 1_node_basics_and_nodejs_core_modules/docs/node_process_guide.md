# Node.js `process` Object Guide

## What is process?

The `process` object is a global object that gives your program information about the currently running Node.js process. Think of it as the operating system's control panel for your Node application.

It lets your program know things like:
* How it was started
* Command-line arguments
* Environment variables
* Current working directory
* Memory usage
* CPU usage
* Process ID
* Node version
* Exit status

You don't need to import it:

```javascript
console.log(process);
```

---

## Why does it exist?

Suppose someone runs:

```bash
node app.js
```

Node creates a process to execute your code. The `process` object lets your program communicate with that running process.

Without it, your application wouldn't know:
* Which environment it's running in
* Which port to use
* Which folder it's started from
* How much memory it's consuming
* How to exit cleanly

---

## Real-world uses

### 1. Environment Variables ⭐⭐⭐⭐⭐
Probably the most common use.

```javascript
const PORT = process.env.PORT;
// or
const DATABASE_URL = process.env.DATABASE_URL;
```

Used in nearly every Express application.

### 2. Reading Command Line Arguments
Example execution:

```bash
node app.js hello world
```

```javascript
console.log(process.argv);
```

**Output:**
```json
[
  '/usr/bin/node',
  '/project/app.js',
  'hello',
  'world'
]
```

**Used for:**
* CLI tools
* npm scripts
* Automation
* Generators

### 3. Exiting the program

```javascript
process.exit(0);
```

**Example:**
```javascript
if (!process.env.JWT_SECRET) {
    console.log("Missing JWT Secret");
    process.exit(1);
}
```

This prevents the server from starting with an invalid configuration.

### 4. Detecting production mode

```javascript
if (process.env.NODE_ENV === "production") {
    // production logic
}
```

Almost every backend uses this.

### 5. Memory Monitoring

```javascript
console.log(process.memoryUsage());
```

Useful when debugging memory leaks.

### 6. Getting current directory

```javascript
console.log(process.cwd());
```

Useful when reading configuration files or resolving paths.

### 7. Node version

```javascript
console.log(process.version);
```

Useful for debugging.

---

## Things you'll use constantly

* ⭐⭐⭐⭐⭐ `process.env`
* ⭐⭐⭐⭐ `process.argv`
* ⭐⭐⭐ `process.exit()`
* ⭐⭐⭐ `process.cwd()`
* ⭐⭐ `process.memoryUsage()`
* ⭐⭐ `process.pid`
* ⭐⭐ `process.version`

---

## Experiments

Don't just read. Run these.

### Experiment 1
```javascript
console.log(process.pid);
```
Run it several times.  
**Question:** Does the PID stay the same?

### Experiment 2
```javascript
console.log(process.cwd());
```
Run it from different folders.  
**Observe:** Does it change?

### Experiment 3
```javascript
console.log(process.argv);
```
Run:
```bash
node app.js apple banana orange
```
Observe the output.

### Experiment 4
```javascript
console.log(process.memoryUsage());
```
Then create:
```javascript
const arr = [];
for (let i = 0; i < 5_000_000; i++) {
    arr.push(i);
}
console.log(process.memoryUsage());
```
**Question:** Which values increased?

### Experiment 5
```javascript
console.log(process.env);
```
Notice how many environment variables are already available on your system.

---

## Practice Exercises

### Exercise 1 (Easy)
Print:
* Node version
* Current directory
* Platform

### Exercise 2 (Easy)
Accept your name from the command line.

```bash
node app.js Prahans
```

**Output:**
```text
Hello Prahans
```

### Exercise 3 (Medium)
Accept two numbers from the command line:

```bash
node app.js 15 20
```

**Output:**
```text
35
```

### Exercise 4 (Medium)
If no name is provided:
```text
Please provide your name.
```
and exit with `process.exit(1);`.

### Exercise 5 (Hard)
Build a tiny calculator:

```bash
node app.js add 10 20
# Output: 30

node app.js subtract 50 20
# Output: 30
```

---

## Interview Questions

1. Is `process` global?
2. What is `process.env`?
3. Difference between `process.cwd()` and `__dirname`?
4. What does `process.argv` contain?
5. What does `process.exit(1)` mean?
6. What is `NODE_ENV`?

> If you can answer these confidently, you're in good shape for junior Node.js interviews.

---

## Mini Project

Create a simple CLI greeting app:

```bash
node greet.js John
```

**Output:**
```text
Hello John 👋
Today is a great day to learn Node.js.
```

Add support for:

```bash
node greet.js John --uppercase
```

**Output:**
```text
HELLO JOHN 👋
TODAY IS A GREAT DAY TO LEARN NODE.JS.
```

This will help you practice `process.argv` in a realistic way.
