# Path Module (`node:path`)

The **Path module** is a built-in Node.js module used to work with **file and directory paths**. It helps create, normalize, join, and manipulate file paths in a way that works across different operating systems.

> Since Node.js v14+, it is recommended to import it using `node:path`.

```js
import path from "node:path";
```

or

```js
const path = require("node:path");
```

---

# Why Use the Path Module?

Without the `path` module, manually creating file paths can cause problems because different operating systems use different path separators.

### Windows

```text
C:\Users\John\Documents\file.txt
```

### Linux / macOS

```text
/home/john/Documents/file.txt
```

Instead of manually writing paths, use the `path` module.

```js
const filePath = path.join("users", "john", "file.txt");
```

Windows

```text
users\john\file.txt
```

Linux/macOS

```text
users/john/file.txt
```

---

# Core Concepts

## Absolute Path

An absolute path starts from the root of the filesystem.

Windows

```text
C:\Users\John\Desktop\notes.txt
```

Linux/macOS

```text
/home/john/Desktop/notes.txt
```

---

## Relative Path

A relative path is based on the current working directory.

```text
./images/logo.png
```

or

```text
../config/database.js
```

---

## Path Separator

```js
console.log(path.sep);
```

Windows

```text
\
```

Linux/macOS

```text
/
```

Useful when writing cross-platform code.

---

## Delimiter

The delimiter separates paths in environment variables like `PATH`.

```js
console.log(path.delimiter);
```

Windows

```text
;
```

Linux/macOS

```text
:
```

---

# Most Used Methods

---

## path.join()

Joins path segments together using the correct separator.

```js
path.join("users", "john", "notes.txt");
```

Output

```text
users/john/notes.txt
```

It also removes unnecessary slashes.

```js
path.join("users", "//john", "notes.txt");
```

Output

```text
users/john/notes.txt
```

---

## path.resolve()

Creates an absolute path.

```js
path.resolve("images", "logo.png");
```

Output

```text
/your/current/directory/images/logo.png
```

If an absolute path is encountered, everything before it is ignored.

```js
path.resolve("test", "/images", "logo.png");
```

Output

```text
/images/logo.png
```

### Difference between `join()` and `resolve()`

| `join()` | `resolve()` |
|----------|-------------|
| Joins path segments | Creates an absolute path |
| Returns relative path unless absolute provided | Always returns an absolute path |
| Common for building file paths | Common for locating project files |

---

## path.basename()

Returns the last part of a path.

```js
path.basename("/users/john/file.txt");
```

Output

```text
file.txt
```

Remove extension:

```js
path.basename("/users/john/file.txt", ".txt");
```

Output

```text
file
```

---

## path.dirname()

Returns the directory name.

```js
path.dirname("/users/john/file.txt");
```

Output

```text
/Users/john
```

---

## path.extname()

Returns the file extension.

```js
path.extname("photo.png");
```

Output

```text
.png
```

Example:

```js
path.extname("archive.tar.gz");
```

Output

```text
.gz
```

---

## path.parse()

Converts a path into an object.

```js
path.parse("/users/john/file.txt");
```

Output

```js
{
  root: "/",
  dir: "/users/john",
  base: "file.txt",
  ext: ".txt",
  name: "file"
}
```

---

## path.format()

Creates a path from an object.

```js
path.format({
  dir: "/users/john",
  name: "file",
  ext: ".txt",
});
```

Output

```text
/users/john/file.txt
```

---

## path.normalize()

Removes unnecessary separators and resolves `.` and `..`.

```js
path.normalize("/users//john/../docs/file.txt");
```

Output

```text
/users/docs/file.txt
```

---

## path.isAbsolute()

Checks whether a path is absolute.

```js
path.isAbsolute("/users/john");
```

Output

```text
true
```

```js
path.isAbsolute("./users/john");
```

Output

```text
false
```

---

## path.relative()

Returns the relative path from one location to another.

```js
path.relative("/users/john", "/users/john/documents/file.txt");
```

Output

```text
documents/file.txt
```

---

# Special Variables

## `__dirname` (CommonJS)

Directory of the current file.

```js
console.log(__dirname);
```

---

## `__filename` (CommonJS)

Full path of the current file.

```js
console.log(__filename);
```

---

# ES Modules Alternative

`__dirname` and `__filename` do **not** exist in ES Modules.

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);
```

---

# Real-World Examples

## Read a file in the same directory

```js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data.txt");

const data = await fs.readFile(filePath, "utf8");

console.log(data);
```

---

## Build an uploads folder

```js
const uploadDir = path.join(process.cwd(), "uploads");
```

---

## Get file extension

```js
const ext = path.extname("avatar.png");

if (ext === ".png") {
  console.log("PNG image");
}
```

---

## Generate an absolute path

```js
const configPath = path.resolve("config", "database.json");

console.log(configPath);
```

---

# Best Practices

- Always use `path.join()` instead of manually concatenating paths.
- Use `path.resolve()` when you need an absolute path.
- Prefer importing with `node:path`.
- Use `path.extname()` to validate file types.
- Use `path.parse()` when you need multiple pieces of path information.
- Use `process.cwd()` for project-root-based paths.
- Use `__dirname` (CommonJS) or `import.meta.url` (ES Modules) when referencing files relative to the current module.

---

# Cheat Sheet

| Method | Description |
|---------|-------------|
| `path.join()` | Join path segments |
| `path.resolve()` | Create an absolute path |
| `path.basename()` | Get file name |
| `path.dirname()` | Get directory name |
| `path.extname()` | Get file extension |
| `path.parse()` | Convert path into an object |
| `path.format()` | Convert object into path |
| `path.normalize()` | Clean up a path |
| `path.relative()` | Relative path between two locations |
| `path.isAbsolute()` | Check if path is absolute |
| `path.sep` | OS path separator |
| `path.delimiter` | Environment variable separator |

---

# Summary

The `path` module is essential for writing **cross-platform Node.js applications**. It abstracts away operating system differences and provides utilities for safely creating, inspecting, and transforming file paths. In day-to-day development, you'll most often use:

- `path.join()` – Build file and folder paths.
- `path.resolve()` – Create absolute paths.
- `path.basename()` – Get a file name.
- `path.dirname()` – Get a directory.
- `path.extname()` – Get a file extension.
- `path.parse()` – Break a path into its components.