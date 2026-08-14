# 🎓 Node.js Masterclass

# Module 2 — Streams

> **Course Goal:** Learn Streams from first principles, understand how they work internally, and know when and why to use them in real-world backend applications.

---

## 🚀 Why Learn Streams?

This is where Node.js starts to feel **different** from other backend runtimes.

If **EventEmitter** is the **heart** of Node.js, then **Streams are its bloodstream**.

Almost everything in Node.js uses streams:

- 📁 Reading files
- 💾 Writing files
- 🌐 HTTP requests
- 🌐 HTTP responses
- 📦 File uploads
- 📥 File downloads
- 🗄 Database drivers
- 🔌 TCP sockets
- 🖥 Terminal input/output (`process.stdin`, `process.stdout`)
- 🗜 Compression (`zlib`)
- 🔐 Encryption (`crypto`)

Many developers use these APIs every day without really understanding streams.

Our goal is to understand **how they work**, not just how to copy code.

---

# 📚 Stream Course Roadmap

We'll treat this like a mini-course.

---

# Section 1 — Stream Fundamentals ⭐⭐⭐⭐⭐ (Essential)

## Lesson 1 — What is a Stream?

Topics covered:

- Why streams exist
- Streams vs loading everything into memory
- Memory efficiency
- Real-world analogy
- Buffer vs Stream
- First stream example

---

## Lesson 2 — Readable Streams

Topics:

- `fs.createReadStream()`
- Events:
  - `"data"`
  - `"end"`
  - `"error"`
  - `"close"`
- Flowing Mode
- Paused Mode
- `highWaterMark`

---

## Lesson 3 — Writable Streams

Topics:

- `fs.createWriteStream()`
- `write()`
- `end()`
- `"finish"`
- `"drain"`
- `"error"`

---

## Lesson 4 — Piping Streams ⭐⭐⭐⭐⭐

Probably the most important lesson.

Topics:

- `pipe()`
- Why `pipe()` exists
- Automatic backpressure
- Copying files
- HTTP responses
- Image serving
- Video streaming

---

## Lesson 5 — Backpressure ⭐⭐⭐⭐⭐

One of the most important Node.js interview topics.

Topics:

- What is backpressure?
- Why it exists
- How Node solves it
- Internal buffering
- Slow consumers
- Fast producers

---

## Lesson 6 — Transform Streams

Topics:

- Modify data while it flows
- Compression
- Encryption
- Parsing
- Logging

---

## Lesson 7 — Duplex Streams

Topics:

- Reading and writing simultaneously
- TCP sockets
- WebSockets

---

## Lesson 8 — Object Mode

Topics:

- Streams with JavaScript objects
- ETL pipelines
- Data processing

---

## Lesson 9 — Pipeline

Modern Node.js stream handling.

```javascript
pipeline(...)
```

Safer than `.pipe()`.

---

## Lesson 10 — Real Projects

We'll build things like:

- Large file copier
- Log processor
- CSV reader
- Image server
- Video streaming server
- File uploader
- Compression tool

---

# Before We Start...

One question.

## What exactly is a Stream?

Many beginners think:

> "A stream is a file."

❌ No.

Others think:

> "A stream is an EventEmitter."

❌ Also no.

Others think:

> "A stream is a Buffer."

❌ Wrong again.

Let's understand it from first principles.

---

# 📚 Lesson 1 — What is a Stream?

## Imagine This...

You ask your friend to send you a **20 GB movie**.

There are two possible ways.

---

## Method 1 — Wait for the Entire File

```text
20 GB
█████████████████████████

Wait...
Wait...
Wait...

Finally receive everything.

Now start watching.
```

You can't watch anything until the entire movie has finished downloading.

This is like:

```javascript
fs.readFile();
```

It reads the whole file into memory before you can use it.

---

## Method 2 — Watch While Receiving

Netflix doesn't wait for the whole movie.

```text
Receive 1 MB
      ↓
     Play
      ↓
Receive another 1 MB
      ↓
     Play
      ↓
Receive another 1 MB
      ↓
     Play...
```

You start watching almost immediately while more data continues arriving.

That is the core idea of a **stream**.

---

# Definition

> **A stream is a way to process data piece by piece (in chunks) instead of loading it all into memory at once.**

The phrase **piece by piece** is the key.

---

# 📦 Real-World Analogy

Imagine you need to move **10,000 books**.

### Option 1

Carry every book at once.

Impossible.

---

### Option 2

Carry 20 books.

Come back.

Carry another 20.

Repeat.

```text
Books
↓↓↓↓↓↓↓↓↓↓↓↓↓

📦
📦
📦
📦
```

Eventually...

Everything gets moved.

- The books represent the **data**.
- Each box represents a **chunk**.

This is exactly how streams work.

---

# Why Not Read Everything Into Memory?

Suppose you have:

```text
video.mp4

20 GB
```

Now imagine:

```javascript
const data = fs.readFileSync("video.mp4");
```

Node tries to load **20 GB** into RAM.

Most computers don't have that much free memory for one operation.

Even if they do, it's wasteful.

---

Now imagine **100 users** downloading that file.

```text
20 GB × 100 users = 2 TB
```

Clearly impossible for most servers.

---

Now use a stream instead.

```text
64 KB
  ↓
Send
  ↓
64 KB
  ↓
Send
  ↓
64 KB
  ↓
Send
```

Memory usage stays almost constant because each chunk is processed and then discarded.

---

# What is a Chunk?

A stream doesn't read one byte at a time.

That would be slow.

Instead, it groups bytes together.

Imagine the file contains:

```text
ABCDEFGHIJKLMNOP
```

Instead of reading:

```text
A
B
C
D
...
```

Node reads:

```text
ABCD
EFGH
IJKL
MNOP
```

Each group is called a **chunk**.

In Node.js, a chunk is usually represented as a **Buffer**.

---

# Streams + EventEmitter

This connects directly to what you've just learned.

A readable stream emits events like this:

```text
Readable Stream
       ↓
    "data"
       ↓
    "data"
       ↓
    "data"
       ↓
     "end"
       ↓
    "error"
```

Because **Streams inherit from EventEmitter**.

That's why learning EventEmitter first makes streams much easier to understand.

---

# Your First Stream

```javascript
const fs = require("fs");

const stream = fs.createReadStream("notes.txt");
```

What happens here?

- No file contents have been loaded yet.
- You created a stream object that knows **how** to read the file.
- As data becomes available, it emits `"data"` events with chunks.
- When the file is finished, it emits `"end"`.
- If something goes wrong, it emits `"error"`.

We'll explore those events in the next lesson.

---

# 🧠 Key Takeaways

- A **stream** processes data gradually instead of all at once.
- Data is transferred in **chunks**.
- Streams are **memory-efficient** and ideal for large or continuous data.
- `fs.readFile()` loads the entire file before returning.
- `fs.createReadStream()` lets you begin processing immediately as chunks arrive.
- Streams are **EventEmitters**, which is why events like `"data"` and `"end"` exist.

---

# 📝 Exercise 1

### Step 1

Create a text file called:

```text
story.txt
```

Fill it with several paragraphs of text.

---

### Step 2

Write one script using:

```javascript
fs.readFile();
```

---

### Step 3

Write another script using:

```javascript
fs.createReadStream();
```

---

### Step 4

Don't worry if you don't know how to read chunks yet.

For now, simply create the stream and log the stream object.

```javascript
console.log(stream);
```

---

### Step 5

Compare the two approaches conceptually.

Ask yourself:

- Which one loads the entire file into memory?
- Which one prepares to read the file in chunks?

---

# ❓ Before Lesson 2

One small question for you (no pressure if you're not sure):

> If a **Readable Stream** is an **EventEmitter**, what event do you think it emits every time a new chunk of data becomes available?

**Hint:** We briefly listed it above.

If you answer that correctly, you'll already be thinking like a Node.js developer.
