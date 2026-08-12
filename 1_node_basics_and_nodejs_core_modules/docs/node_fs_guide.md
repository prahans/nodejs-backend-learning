# Node.js `fs` Module

## What is the `fs` Module?

Think of Node.js like this:

```text
Node.js
│
├── Memory (Variables)
├── CPU (JavaScript execution)
└── Hard Drive (Files)
```

Your JavaScript variables disappear after the program exits.

Files do not.

The **`fs` (File System)** module is Node.js's way of communicating with your computer's storage.

It allows Node.js to say:

- "Open this file."
- "Read this file."
- "Write some data."
- "Rename this."
- "Delete that."

Without the `fs` module, Node.js couldn't save data permanently.

---

# Real World Examples

Almost every backend application uses the `fs` module somewhere.

## Authentication

```text
Read .env file

↓

Read private keys

↓

Read SSL certificates
```

---

## Logging

```text
Server starts

↓

Write into logs.txt

↓

Append new logs on every request
```

---

## Uploading Images

```text
User uploads photo

↓

Node saves image

↓

Later reads image
```

---

## Configuration

```text
config.json

↓

Read once

↓

Use everywhere
```

---

## Database Backup

```text
Export database

↓

Write into backup.sql
```

---

## Reading HTML Files

Before Express, many Node servers worked like this:

```text
Read index.html

↓

Send to browser
```

---

# Core Mental Model

Imagine your computer is a huge city.

```text
Computer
│
├── Folder
│     ├── image.png
│     ├── notes.txt
│     ├── data.json
│     └── users.csv
```

The `fs` module gives you powers to:

- Create
- Read
- Update
- Delete
- Rename
- Copy
- Move

Think of it as **CRUD for files**.

---

# The Three Versions of `fs`

This is where many beginners get confused.

There are **three different APIs**.

---

## 1. Synchronous API

```js
readFileSync();
```

Node.js waits until the file is completely read.

```text
Start

↓

Read file

↓

Continue execution
```

Nothing else can happen during this time.

---

## 2. Callback API

```js
readFile();
```

Node.js starts reading the file.

It doesn't wait.

Instead, it calls a callback function when the operation finishes.

```text
Start

↓

Reading...

↓

Continue running code

↓

Finished

↓

Callback executes
```

---

## 3. Promise API ⭐ (Recommended)

```js
import fs from "node:fs/promises";
```

Uses `async/await`.

```js
await fs.readFile(...)
```

This is cleaner and is the preferred approach in modern Node.js applications.

---

# Which Version Should You Learn?

| API      | Learn?    | Used in Real Projects |
| -------- | --------- | --------------------- |
| Sync     | ✅ Yes    | Sometimes             |
| Callback | ✅ Yes    | Legacy code           |
| Promise  | ⭐ Master | Everywhere            |

---

# Important Methods

## Reading Files

```js
readFile();

readFileSync();
```

---

## Writing Files

```js
writeFile();

writeFileSync();
```

- Creates the file if it doesn't exist.
- Overwrites the file if it already exists.

---

## Appending Data

```js
appendFile();
```

Adds new data to the end of a file.

Perfect for log files.

---

## Creating a Folder

```js
mkdir();
```

---

## Reading a Folder

```js
readdir();
```

---

## Checking File Information

```js
stat();
```

Returns information such as:

- File size
- Creation date
- Last modified date
- `isFile()`
- `isDirectory()`

---

## Renaming Files

```js
rename();
```

---

## Copying Files

```js
copyFile();
```

---

## Deleting Files

```js
unlink();
```

Deletes a file.

---

## Deleting Folders

```js
rm();
```

Deletes a directory.

---

# Using `fs/promises`

Correct imports:

```js
import { promises as fs } from "fs";
```

or

```js
import fs from "node:fs/promises";
```

Then use:

```js
await fs.writeFile(...)
```

**Incorrect**

```js
await fsPromises.writeFile(...)
```

unless you imported it like this:

```js
import { promises as fsPromises } from "fs";
```

---

# Encoding

Without encoding:

```js
const data = await fs.readFile("hello.txt");
```

Output:

```text
Buffer
```

With encoding:

```js
const data = await fs.readFile("hello.txt", "utf8");
```

Output:

```text
String
```

This is one of the most common beginner mistakes.

---

# Understanding Buffers

Everything stored on disk is made of bytes.

```text
01010101
```

Node.js reads bytes first.

A **Buffer** is simply a collection of bytes.

```text
File

↓

Buffer

↓

String
```

---

# Absolute vs Relative Paths

Avoid this in large projects:

```js
"./data.txt";
```

Instead use:

```js
path.join(...)
```

or

```js
path.resolve(...)
```

Since you've already learned the **`path` module**, you'll frequently use it together with `fs`.

Example workflow:

```text
Current Folder

↓

Join filename

↓

Read file
```

---

# Error Handling

Always handle errors.

```js
try {
    await fs.readFile(...)
} catch (err) {
    console.log(err);
}
```

Never assume that a file exists.

---

# Best Practices

## ✅ Prefer `async/await`

Use the Promise API instead of callbacks whenever possible.

---

## ✅ Specify UTF-8 When Reading Text

```js
await fs.readFile(file, "utf8");
```

---

## ✅ Don't Block the Event Loop

Avoid using:

```js
readFileSync();
```

inside servers.

Synchronous methods block every incoming request.

---

## ✅ Use the `path` Module

Never hardcode paths like:

```text
C:\Users...
```

or

```text
/home/...
```

Instead, use `path.join()` or `path.resolve()`.

---

## ✅ Handle Missing Files

The error

```text
ENOENT
```

is extremely common.

Always expect it.

---

## ✅ Separate File Logic

Instead of putting everything inside:

```text
server.js
```

organize your project like:

```text
services/

utils/

storage/
```

You'll appreciate this structure as your applications grow.

---

# Real Project Ideas

## Beginner — Notes App

Features:

```text
Add note

Delete note

Read notes

Update note
```

Store everything inside a JSON file.

---

## Password Manager

```text
Save passwords

↓

Read passwords

↓

Delete passwords
```

Combine the `crypto` module with `fs`.

---

## Logger

```text
Every action

↓

Append to logs.txt
```

---

## Todo CLI

Commands:

```text
node app add

node app remove

node app list
```

---

## Inventory Management

Store products in:

```text
products.json
```

Perform full CRUD operations.

---

## Mini File-Based Database

Without MongoDB or MySQL.

Simply use:

```text
users.json
```

Example:

```json
[
  {
    "id": 1,
    "name": "John"
  }
]
```

Functions:

```text
createUser()

getUser()

updateUser()

deleteUser()
```

This is one of the best projects before learning real databases.

---

# Exercises

## Level 1

- Read a text file.
- Write a text file.
- Append to a text file.
- Rename it.
- Delete it.

---

## Level 2

- Create a folder.
- Delete a folder.
- List all files inside.

---

## Level 3

- Read a JSON file.
- Convert it to a JavaScript object.
- Modify it.
- Save it back.

---

## Level 4

- Copy an image.
- Rename it.
- Delete the original.

---

## Level 5 ⭐

Build a Notes Application.

Commands:

```text
add

delete

list

update
```

No database.

Only the `fs` module.

---

## Level 6 ⭐⭐⭐

Build your own tiny file-based database.

Example:

```json
[
  {
    "id": 1,
    "name": "John"
  }
]
```

Implement:

```text
createUser()

getUser()

updateUser()

deleteUser()
```

---

# Common Beginner Mistakes

1. Using synchronous methods everywhere.
2. Forgetting `await`.
3. Forgetting `"utf8"` and receiving a `Buffer`.
4. Ignoring errors.
5. Hardcoding file paths.
6. Accidentally overwriting files with `writeFile()` instead of using `appendFile()`.
7. Mixing callback APIs and Promise APIs in the same function.

---

# How `fs` Fits Into Your Learning Roadmap

```text
✔ Process
        ↓
✔ Timers
        ↓
✔ OS
        ↓
✔ Path
        ↓
✔ Crypto
        ↓
⭐ File System (fs)
        ↓
Streams
        ↓
Events
        ↓
HTTP Module
        ↓
Building a Node Server
        ↓
Express
        ↓
Databases
```

Notice how the **`path`** and **`fs`** modules naturally complement each other.

Later, when you learn **Streams**, you'll discover a more memory-efficient way to work with large files instead of loading everything into memory using `readFile()`.

---

# Mentor's Advice

Don't memorize methods like `readFile()` or `writeFile()`.

Instead, ask yourself these questions every time you solve a problem:

- Where is the data stored? (Memory or disk?)
- Will this operation block the event loop?
- What happens if the file doesn't exist?
- Could the file become very large?
- Should I overwrite the file or append to it?

Developers who consistently think this way build backend applications that are more reliable, scalable, and maintainable.

---

## Practical Learning Rule

For every new `fs` method you learn:

> Build one small program using it.

Ten tiny projects will teach you far more than reading twenty pages of documentation.

This hands-on practice will prepare you well for:

- Streams
- HTTP Module
- Express.js
- Databases
- Real-world backend development
