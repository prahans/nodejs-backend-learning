# Node.js Buffer

## What is a Buffer?

A **Buffer** is Node.js's way of working with **raw binary data**.

When Node.js reads a file, receives data from a network, or processes streams, the data is usually handled as a **Buffer** before being converted into a string or another format.

```text
File / Network

↓

Buffer (Bytes)

↓

String / JSON / Image / Video
```

Think of a Buffer as a container of bytes.

---

# Why Buffers Exist

Computers store everything as bytes.

Examples:

- 📄 Text files
- 🖼️ Images
- 🎵 Audio
- 🎥 Videos
- 📦 ZIP files

Node.js uses Buffers to efficiently read and write this binary data.

---

# Creating Buffers

## From a String

```js
const buffer = Buffer.from("Hello World");
```

---

## Allocate a Fixed Size

```js
const buffer = Buffer.alloc(10);
```

Creates a buffer of **10 bytes**, initialized with zeros.

---

# Converting Buffers

## Buffer → String

```js
const text = buffer.toString();
```

---

## String → Buffer

```js
const buffer = Buffer.from("Hello");
```

---

# Reading Files as Buffers

Without an encoding, `fs.readFile()` returns a Buffer.

```js
const data = await fs.readFile("notes.txt");

console.log(data); // Buffer
```

With an encoding:

```js
const data = await fs.readFile("notes.txt", "utf8");

console.log(data); // String
```

---

# Useful Properties

## Buffer Length

```js
buffer.length;
```

Returns the size of the buffer in **bytes**.

---

# Useful Methods

## `Buffer.from()`

Creates a Buffer from existing data.

```js
const buffer = Buffer.from("Node.js");
```

---

## `Buffer.alloc()`

Creates an empty buffer with a fixed size.

```js
const buffer = Buffer.alloc(16);
```

---

## `buffer.toString()`

Converts a Buffer into a string.

```js
console.log(buffer.toString());
```

---

## `buffer.equals()`

Compares two buffers.

```js
buffer1.equals(buffer2);
```

Returns:

```text
true
false
```

---

## `Buffer.isBuffer()`

Checks whether a value is a Buffer.

```js
Buffer.isBuffer(value);
```

Returns:

```text
true
false
```

---

# Common Use Cases

- Reading files (`fs`)
- File uploads
- Downloading files
- Network communication (TCP/HTTP)
- Streams
- Cryptography
- Image and video processing

---

# Best Practices

- ✅ Convert to a string only when you need text.
- ✅ Use Buffers for binary data (images, PDFs, videos, etc.).
- ✅ Don't modify Buffer contents unless necessary.
- ✅ Learn Buffers before diving into Streams—they work together.

---

# Quick Summary

| Method / Property   | Purpose                      |
| ------------------- | ---------------------------- |
| `Buffer.from()`     | Create a buffer from data    |
| `Buffer.alloc()`    | Allocate a fixed-size buffer |
| `buffer.toString()` | Convert buffer to a string   |
| `buffer.length`     | Get the size in bytes        |
| `buffer.equals()`   | Compare two buffers          |
| `Buffer.isBuffer()` | Check if a value is a Buffer |

---

# Mental Model

```text
Disk / Network

↓

Bytes

↓

Buffer

↓

Your JavaScript Code
```

A **Buffer** is simply a temporary container for bytes that allows Node.js to efficiently handle binary data.
