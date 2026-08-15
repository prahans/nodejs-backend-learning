# 🚀 Lesson 2 — Readable Streams: Deep Dive

Exactly. We’ll complete **all 10 parts in one lesson**, with the goal of understanding what is happening underneath the API—not just memorizing `createReadStream()`.

---

# 1. What exactly is a Readable Stream?

A **Readable Stream** is an object that lets your Node.js program **receive data gradually over time instead of loading everything into memory at once**.

Think about reading a 5 GB video file.

### Without a stream

You could theoretically do:

```
const data = fs.readFileSync("movie.mp4");
```

Conceptually:

```
5 GB file
```

   ↓

load entire 5 GB

   ↓

RAM

   ↓

application

That's potentially terrible for memory.

### With a Readable Stream

```
const stream = fs.createReadStream("movie.mp4");
```

The idea becomes:

```
5 GB file
```

   ↓

┌──────────┐

│  chunk 1 │ → application

└──────────┘

┌──────────┐

│  chunk 2 │ → application

└──────────┘

┌──────────┐

│  chunk 3 │ → application

└──────────┘

        ...

The entire file doesn't need to be in RAM.

### The important mental model

A Readable Stream is basically:

> **A controlled source of data that produces chunks over time.**

And this is important:

**Readable does NOT mean "the entire data is readable immediately."**

It means:

> "This object is capable of providing data to you."

---

# 2. `fs.createReadStream()`

Node provides:

```
fs.createReadStream()
```

for reading files as streams.

Example:

```
const fs = require("fs");
```




const stream = fs.createReadStream("file.txt");

Now `stream` is a **Readable Stream**.

You can inspect it:

```
console.log(stream);
```

But you normally don't manually ask it for every chunk.

Instead, Node's stream system manages the process.

For example:

```
stream.on("data", (chunk) => {
```

console.log(chunk);

});

Conceptually:

```
File
```

 ↓

Operating System

 ↓

Node.js

 ↓

Readable Stream

 ↓

chunk

 ↓

your application

The stream acts as the bridge between the underlying data source and your application.

---

# 3. The `"data"` Event

This is one of the most important things to understand.

When a Readable Stream is producing data in **flowing mode**, it emits:

```
"data"
```

for each chunk.

Example:

```
const fs = require("fs");
```




const stream = fs.createReadStream("file.txt");




stream.on("data", (chunk) => {

console.log(chunk);

});

Suppose the file contains:

```
Hello World
```

You might conceptually receive:

```
chunk 1
```

chunk 2

chunk 3

...

The exact chunks depend on things such as the stream's buffering configuration and underlying implementation.

### What is `chunk`?

A chunk is simply a **piece of the data**.

For a normal file stream, you'll commonly receive a `Buffer`.

```
stream.on("data", (chunk) => {
```

console.log(chunk);

console.log(chunk instanceof Buffer);

});

You can convert it:

```
stream.on("data", (chunk) => {
```

console.log(chunk.toString());

});

Or request text encoding:

```
stream.setEncoding("utf8");
```




stream.on("data", (chunk) => {

console.log(chunk);

});

Now you'll receive strings instead of Buffers.

### Very important

Don't think:

> `"data"` = one line.

Wrong.

Don't think:

> `"data"` = one object.

Wrong.

Think:

> `"data"` = **a chunk currently being delivered by the stream.**

---

# 4. The `"end"` Event

Once the Readable Stream has **no more data to provide**, it emits:

```
"end"
```

Example:

```
const fs = require("fs");
```




const stream = fs.createReadStream("file.txt");




stream.on("data", (chunk) => {

console.log("Received:", chunk.toString());

});




stream.on("end", () => {

console.log("Finished reading!");

});

Conceptually:

```
data
```

 ↓

data

 ↓

data

 ↓

data

 ↓

end

### `"end"` means:

> The stream has finished providing data.

It does **not** mean:

> The underlying resource has necessarily been completely closed at that exact moment.

That's an important distinction we'll see with `"close"`.

---

# 5. The `"error"` Event

Streams can encounter errors.

For example:

```
const fs = require("fs");
```




const stream = fs.createReadStream("does-not-exist.txt");




stream.on("error", (err) => {

console.error("Something went wrong:", err.message);

});

Without proper error handling, an emitted `"error"` event can become an **uncaught exception** and terminate the Node.js process.

So when working directly with streams, this is extremely important:

```
stream.on("error", (err) => {
```

// handle error

});

### Typical errors

For a file stream:

```
File doesn't exist
```

       ↓

File permission problem

       ↓

Filesystem error

       ↓

Stream emits "error"

### A common beginner mistake

```
const stream = fs.createReadStream("missing.txt");
```




stream.on("data", ...);

stream.on("end", ...);

Where is the error listener?

Missing.

Better:

```
stream.on("data", (chunk) => {
```

console.log(chunk);

});




stream.on("end", () => {

console.log("Finished");

});




stream.on("error", (err) => {

console.error(err);

});

### Important relationship

A stream can emit:

```
data
```

data

data

error

and then the normal successful completion sequence doesn't necessarily happen.

So don't assume:

```
"end" always happens
```

It doesn't.

---

# 6. The `"close"` Event

This is where many developers get confused.

A Readable Stream can emit:

```
"close"
```

when the underlying resource has been closed.

Example:

```
stream.on("close", () => {
```

console.log("Stream closed");

});

The distinction is:

### `"end"`

Means:

> **The stream has no more data to provide.**

### `"close"`

Means:

> **The underlying resource has been closed.**

For a file stream, conceptually:

```
file
```

 ↓

data

 ↓

data

 ↓

data

 ↓

end

 ↓

resource closes

 ↓

close

In normal circumstances, you may see:

```
data
```

data

data

end

close

But don't treat `"end"` and `"close"` as interchangeable.

---

# 7. Flowing Mode vs Paused Mode

🔥 **This is one of the most important stream concepts.**

A Readable Stream can operate in two major modes:

```
FLOWING MODE
```

PAUSED MODE

---

## Flowing Mode

In flowing mode, data automatically flows from the source to your application.

For example:

```
const stream = fs.createReadStream("file.txt");
```




stream.on("data", (chunk) => {

console.log(chunk);

});

Adding a `"data"` listener causes the stream to start flowing.

Conceptually:

```
SOURCE
```

  ↓

chunk

  ↓

chunk

  ↓

chunk

  ↓

your "data" listener

You don't repeatedly say:

> "Give me another chunk."

The stream pushes chunks toward you.

---

## Paused Mode

In paused mode, the stream doesn't continuously push data to your `"data"` listener.

You can manually request data using:

```
stream.read()
```

Example:

```
const stream = fs.createReadStream("file.txt");
```




stream.on("readable", () => {

let chunk;




while ((chunk = stream.read()) !== null) {

console.log(chunk);

    }

});

Here, you're participating more directly in pulling data from the internal buffer.

Conceptually:

```
SOURCE
```

  ↓

internal buffer

  ↓

      YOU

      ↓

 stream.read()

      ↓

    chunk

---

## The easiest mental model

### Flowing

> **"Give me data whenever it's available."**

```
Stream → → → → Application
```

### Paused

> **"I'll ask you when I want data."**

```
Stream → Buffer
```




Application

     ↓

 stream.read()

     ↓

   Buffer

---

## How does a stream enter flowing mode?

One common way:

```
stream.on("data", handler);
```

You can also explicitly call:

```
stream.resume();
```

And remove the `"data"` listener / pause the stream when appropriate.

For learning purposes, remember:

```
"data" listener
```

      ↓

flowing mode

      ↓

chunks arrive automatically

---

# 8. `highWaterMark` — How Chunk Size Works

This is another concept that interviewers love.

You might think:

> "If I have a 10 MB file, Node sends 10 MB at once."

No.

A stream works with buffers and chunks.

`highWaterMark` is an important setting that controls the **amount of data the stream tries to buffer internally**.

Example:

```
const stream = fs.createReadStream("file.txt", {
```

    highWaterMark: 1024

});

Here:

```
1024 bytes
```

\=

1 KB

For a file Readable Stream, this influences the size of reads/chunks.

So you might see chunks around:

```
1 KB
```

1 KB

1 KB

...

until the file is consumed.

### But here's the critical distinction

`highWaterMark` does **not** mean:

> "The chunk will always be exactly this size."

It is better to think:

> **It is a buffering/read-size threshold, not a universal exact-chunk-size guarantee.**

The final chunk can obviously be smaller.

For example, if:

```
file = 2500 bytes
```

highWaterMark = 1000

you could conceptually get:

```
chunk 1 = 1000 bytes
```

chunk 2 = 1000 bytes

chunk 3 = 500 bytes

---

## Why does `highWaterMark` exist?

Because streams need to balance:

```
Memory usage
```

      ↕

Performance

Small buffer:

```
less memory
```

more frequent operations

Large buffer:

```
more memory
```

potentially fewer operations

So:

```
highWaterMark
```

      ↓

buffering strategy

      ↓

memory/performance tradeoff

### Important Node.js detail

The default `highWaterMark` depends on the stream type and Node.js API. For file Readable streams, the default is commonly **64 KiB**, while many other Readable streams use different defaults.

Don't memorize one universal number.

Memorize the concept.

---

# 9. Real-World Examples

Now let's connect everything to actual backend development.

---

## Example 1 — Sending a large file

Imagine your server has:

```
movie.mp4
```

which is 5 GB.

You don't want:

```
fs.readFile("movie.mp4", ...)
```

to load the entire file into memory.

Instead:

```
const stream = fs.createReadStream("movie.mp4");
```

Then you can pipe it somewhere.

For example, in an HTTP server:

```
const http = require("http");
```

const fs = require("fs");




const server = http.createServer((req, res) => {

const stream = fs.createReadStream("movie.mp4");




stream.pipe(res);

});




server.listen(3000);

The architecture becomes:

```
5 GB file
```

    ↓

Readable Stream

    ↓

chunks

    ↓

HTTP Response

    ↓

Client

That's one of the biggest reasons streams matter in backend development.

---

# Example 2 — Uploading a file

HTTP request bodies are themselves stream-based.

Conceptually:

```
Client
```

  ↓

HTTP Request Stream

  ↓

Node.js

  ↓

Your application

For a large upload:

```
Client
```

 ↓

chunk

 ↓

chunk

 ↓

chunk

 ↓

Server

You don't necessarily need the entire upload sitting in RAM.

---

# Example 3 — Reading a huge log file

Suppose:

```
server.log = 20 GB
```

You can process it progressively:

```
const stream = fs.createReadStream("server.log");
```




stream.on("data", (chunk) => {

// process chunk

});

You could search for:

```
ERROR
```

without first loading the entire 20 GB file into memory.

---

# Example 4 — Compression

Node's `zlib` provides streams.

Conceptually:

```
Readable
```

   ↓

gzip

   ↓

Writable

You can connect them:

```
readStream
```

.pipe(gzip)

.pipe(writeStream);

The data continuously flows through the pipeline.

---

# Example 5 — Encryption

Node's crypto APIs also integrate with streams.

Conceptually:

```
File
```

 ↓

Readable

 ↓

Encryption Transform

 ↓

Writable

 ↓

Encrypted file

Again:

```
chunk → transform → chunk → write
```

You don't need the entire file in memory.

---

# 10. Exercises + Interview Questions

Now let's test whether you **actually understand** Readable Streams.

---

## 🧠 Exercise 1 — Predict the events

Consider:

```
const fs = require("fs");
```




const stream = fs.createReadStream("file.txt");




stream.on("data", (chunk) => {

console.log("DATA");

});




stream.on("end", () => {

console.log("END");

});




stream.on("close", () => {

console.log("CLOSE");

});




stream.on("error", (err) => {

console.log("ERROR");

});

Assuming the file exists and everything works, what is the general order?

Think:

```
?
```

?

?

### Answer

```
DATA
```

DATA

DATA

...

END

CLOSE

The number of `"DATA"` events depends on the file and buffering.

---

# 🧠 Exercise 2 — What happens if the file doesn't exist?

```
const stream = fs.createReadStream("does-not-exist.txt");
```




stream.on("data", () => {

console.log("DATA");

});




stream.on("end", () => {

console.log("END");

});




stream.on("error", () => {

console.log("ERROR");

});

You should understand:

```
ERROR
```

rather than assuming:

```
DATA → END
```

because the stream couldn't successfully read the file.

---

# 🧠 Exercise 3 — Chunk size

Suppose:

```
const stream = fs.createReadStream("file.txt", {
```

    highWaterMark: 1024

});

What does `1024` represent?

### Answer

Approximately:

```
1024 bytes = 1 KiB
```

It controls the stream's buffering/read behavior.

It does **not** mean:

> Every chunk is guaranteed to be exactly 1024 bytes.

---

# 🧠 Exercise 4 — Flowing vs paused

Which one is associated with automatically receiving chunks?

```
stream.on("data", ...)
```

### Answer

**Flowing mode.**

Conceptually:

```
data listener
```

     ↓

flowing

     ↓

chunks automatically arrive

---

# 🧠 Exercise 5 — Explain this code

```
const stream = fs.createReadStream("big.txt");
```




stream.on("data", (chunk) => {

console.log(chunk.length);

});

You should be able to explain:

> `createReadStream()` creates a Readable Stream for the file. The `"data"` listener causes the stream to operate in flowing mode, and the callback receives chunks of data as they become available. The entire file does not need to be loaded into memory.

If you can explain that without memorizing it, you're understanding streams.

---

# 🎯 Interview Questions

## Q1. What is a Readable Stream?

**Answer:**

A Readable Stream is an abstraction for consuming data incrementally over time, usually in chunks, rather than requiring the entire data source to be loaded into memory.

---

## Q2. What does `"data"` mean?

It means a chunk of data is being made available to the consumer, typically while the stream is in flowing mode.

---

## Q3. What does `"end"` mean?

The Readable Stream has no more data to provide.

---

## Q4. What's the difference between `"end"` and `"close"`?

**`end`****:**

> No more data is available.

**`close`****:**

> The underlying resource has been closed.

---

## Q5. Why should you handle `"error"`?

Because stream operations can fail, and an unhandled `"error"` event can cause the Node.js process to terminate.

---

## Q6. What is flowing mode?

The stream automatically pushes chunks to the consumer, commonly through a `"data"` listener.

---

## Q7. What is paused mode?

The stream doesn't continuously push chunks to the consumer; the consumer can control when data is read, such as through `read()`.

---

## Q8. What is `highWaterMark`?

It is a stream buffering/read threshold that influences how much data a stream buffers or requests at a time.

---

## Q9. Does `highWaterMark` guarantee exact chunk size?

**No.**

That's a classic trick question.

It influences buffering/read behavior; it isn't a universal guarantee that every emitted chunk has exactly that size.

---

## Q10. Why are streams useful for large files?

Because they allow data to be processed incrementally rather than requiring the entire resource to be held in memory.

---

# 🧠 The Big Picture

You should now have this mental model:

```
                 READABLE STREAM
```

                       │

                       ↓

                Data Source

                       │

                       ↓

                ┌─────────────┐

                │   Buffer    │

                └─────────────┘

                       │

             ┌─────────┴─────────┐

             ↓                   ↓

        Flowing Mode        Paused Mode

             │                   │

             ↓                   ↓

        "data" events       read()

             │                   │

             └─────────┬─────────┘

                       ↓

                    Consumer

And the lifecycle:

```
createReadStream()
```

       ↓

   Stream created

       ↓

    data chunks

       ↓

    data chunks

       ↓

    data chunks

       ↓

      end

       ↓

     close

If something goes wrong:

```
createReadStream()
```

       ↓

      error

---

# 🔥 The Most Important Mental Model

Don't memorize 10 isolated APIs.

Understand this:

```
SOURCE
```

  │

  │ produces data

  ↓

READABLE STREAM

  │

  │ manages buffering

  │

  │ controls flow

  ↓

CHUNKS

  │

  ↓

YOUR APPLICATION

And these concepts fit around it:

| ConceptMeaning  |                                   |
| --------------- | --------------------------------- |
| Readable Stream | Source you consume data from      |
| `data`          | A chunk is being delivered        |
| `end`           | No more data                      |
| `error`         | Something went wrong              |
| `close`         | Underlying resource closed        |
| Flowing mode    | Data automatically pushed         |
| Paused mode     | Consumer controls reading         |
| `highWaterMark` | Influences buffering/read size    |
| Buffer          | Temporary storage for stream data |
| Chunk           | A piece of the overall data       |

---

# 🚀 One Final Example

Put everything together:

```
const fs = require("fs");
```




const stream = fs.createReadStream("big-file.txt", {

    highWaterMark: 1024

});




stream.on("data", (chunk) => {

console.log("Received:", chunk.length, "bytes");

});




stream.on("end", () => {

console.log("No more data.");

});




stream.on("error", (err) => {

console.error("Stream failed:", err.message);

});




stream.on("close", () => {

console.log("Stream closed.");

});

You should now be able to mentally translate this into:

```
Open file
```

   ↓

Create Readable Stream

   ↓

Buffer/read data

   ↓

"data" → chunk

   ↓

"data" → chunk

   ↓

"data" → chunk

   ↓

...

   ↓

"end" → no more data

   ↓

"close" → resource closed

And if something fails:

```
error
```

 ↓

error handler

### 🎯 What you should know before moving on

You **do not need to memorize every internal implementation detail** yet.

You should be able to explain, in your own words:

> **A Readable Stream provides data incrementally in chunks. It manages buffering and flow between a data source and the consumer. In flowing mode, chunks are pushed through** **`"data"`** **events; in paused mode, the consumer can control reading.** **`"end"`** **means there is no more data,** **`"error"`** **signals failure,** **`"close"`** **indicates the underlying resource has closed, and** **`highWaterMark`** **influences buffering/read behavior.**

If that paragraph makes sense to you rather than merely looking familiar, **Lesson 2 is understood.**

**Next logical lesson:** Writable Streams — where we reverse the direction and learn how Node.js **receives chunks and writes them somewhere**.