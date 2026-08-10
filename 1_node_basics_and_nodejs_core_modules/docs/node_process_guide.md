# Node.js `process` Object Guide

## What is process?

The `process` object is a global object that gives your program information about the currently running Node.js process. Think of it as the operating system's control panel for your Node application.

It lets your program know things like:

- How it was started
- Command-line arguments
- Environment variables
- Current working directory
- Memory usage
- CPU usage
- Process ID
- Node version
- Exit status

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

- Which environment it's running in
- Which port to use
- Which folder it's started from
- How much memory it's consuming
- How to exit cleanly

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
["/usr/bin/node", "/project/app.js", "hello", "world"]
```

**Used for:**

- CLI tools
- npm scripts
- Automation
- Generators

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

- ⭐⭐⭐⭐⭐ `process.env`
- ⭐⭐⭐⭐ `process.argv`
- ⭐⭐⭐ `process.exit()`
- ⭐⭐⭐ `process.cwd()`
- ⭐⭐ `process.memoryUsage()`
- ⭐⭐ `process.pid`
- ⭐⭐ `process.version`

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

- Node version
- Current directory
- Platform

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

# Node.js Process Object Interview Guide

### 1. Is `process` global?

**Answer:** **Yes**. `process` is a global object in Node.js, so you don't need to import it.

```javascript
// Works without const process = require("process");
console.log(process.version);
```

> 💡 **Interview Tip:** If they ask, _"Can I overwrite it?"_ Technically yes: `process = {};`. But you should never do this. It is a built-in global object that Node relies on.

---

### 2. What is `process.env`?

**Answer:** `process.env` is an object containing environment variables. Environment variables store configuration that can change between environments without modifying your code.

**Example Configuration:**

```ini
PORT=3000
DATABASE_URL=postgres://...
JWT_SECRET=mysecret
NODE_ENV=production
```

**Accessing Variables:**

```javascript
const port = process.env.PORT;
```

#### Why is this useful?

Imagine deploying the same application across different stages:

- **Development** → Port `3000`
- **Testing** → Port `4000`
- **Production** → Port `8080`

Instead of changing your code every time, you change the environment variables.

**Real-world Express example:**

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

> 💡 **Interview Tip:** A common follow-up is: _"Should you store secrets in your code?"_
> **Correct answer:** No. Secrets like API keys, database passwords, and JWT secrets should be stored in environment variables, not hardcoded.

---

### 3. Difference between `process.cwd()` and `__dirname`?

This is one of the most common Node.js interview questions.

#### `process.cwd()`

Returns the **current working directory**, meaning the folder from which you started the Node process.

- **Example Command:** `node src/app.js`
- **Project Structure:**
  ```text
  project/
  │
  ├── src/
  │   └── app.js
  ```
- **Inside `app.js`:**
  ```javascript
  console.log(process.cwd()); // Output: project/ (where you ran the command)
  ```

#### `__dirname`

Returns the directory where the **current file** is located.

- **Inside `app.js`:**
  ```javascript
  console.log(__dirname); // Output: project/src
  ```

#### Summary Comparison

| Feature           | `process.cwd()`                            | `__dirname`                                   |
| :---------------- | :----------------------------------------- | :-------------------------------------------- |
| **Definition**    | Where Node was started                     | Where the current file lives                  |
| **Behavior**      | Can change depending on how the app is run | Always points to the current file's directory |
| **Best Use Case** | Useful for project-relative paths          | Useful for file-relative paths                |

> 💡 **Interview Tip:** Many beginners confuse these two. Being able to explain the difference clearly leaves a good impression.

---

### 4. What does `process.argv` contain?

**Answer:** `process.argv` is an array containing the command-line arguments used to start the program.

**Example Execution:**

```bash
node app.js John 25
```

```javascript
console.log(process.argv);
/* 
Output (paths will differ on your machine):
[
  "/usr/bin/node",   // argv[0] -> Path to the Node executable
  "/project/app.js", // argv[1] -> Path to the JavaScript file
  "John",            // argv[2] -> First user argument
  "25"               // argv[3] -> Second user argument
]
*/
```

**Usage Example:**

```javascript
const name = process.argv[2];
console.log(`Hello ${name}`); // Run: node app.js Prahans -> Output: Hello Prahans
```

#### Real-world Usage

- CLI tools
- Build scripts
- File converters
- Code generators
- Deployment scripts

---

### 5. What does `process.exit(1)` mean?

**Answer:** `process.exit()` immediately stops the Node.js process. The number passed to it is the exit code.

- `process.exit(0);` → Program completed **successfully**.
- `process.exit(1);` → Program exited because of an **error**.

**Example:**

```javascript
if (!process.env.JWT_SECRET) {
  console.log("JWT_SECRET is missing");
  process.exit(1);
}
```

#### Common Exit Codes

- **`0`**: Success
- **`1`**: General error

_(Other exit codes exist, but 0 and 1 are the ones you'll use most often)._

> 💡 **Interview Tip:** Many deployment systems, CI pipelines, and Docker containers rely on exit codes to determine whether a program succeeded or failed.

---

### 6. What is `NODE_ENV`?

**Answer:** `NODE_ENV` is an environment variable that indicates which environment the application is running in. Typical values are:

- `development`
- `production`
- `test`

**Example:**

```javascript
if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
}
```

#### Why use it?

Different environments often need different behavior.

- **Development:** Detailed error messages, verbose logging, hot reloading.
- **Production:** Minimal error details, optimized performance, less logging, better security.

**Express example:**

```javascript
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Only enable detailed request logging while developing
}
```

> 💡 **Interview Tip:** A common follow-up question is: _"Is `NODE_ENV` built into Node.js?"_
> **A good answer is:** No. Node.js does not automatically set `NODE_ENV`. It is just a conventional environment variable that developers and frameworks commonly use. You or your deployment platform set it manually.
