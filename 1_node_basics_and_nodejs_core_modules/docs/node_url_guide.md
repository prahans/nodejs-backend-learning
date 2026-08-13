# Node.js URL Module

## What is the URL Module?

The **`URL` module** helps you **parse, create, inspect, and modify URLs** in Node.js.

Instead of manually splitting strings, the `URL` class provides a clean and reliable way to work with web addresses.

Example URL:

```text
https://example.com:8080/products/laptop?id=123&sort=price#reviews
```

Using the `URL` module, you can easily access each part:

```text
Protocol   → https:
Host       → example.com:8080
Hostname   → example.com
Port       → 8080
Pathname   → /products/laptop
Query      → ?id=123&sort=price
Hash       → #reviews
```

---

# Why Use the URL Module?

Without the URL module, you might try to manipulate URLs with string methods like:

```js
split();
substring();
indexOf();
```

This quickly becomes messy and error-prone.

The `URL` class handles parsing and encoding for you.

---

# Importing the Module

```js
import { URL } from "node:url";
```

---

# Creating a URL

```js
const myURL = new URL("https://example.com/products?id=10&category=laptop");
```

---

# Common URL Properties

## `href`

Returns the complete URL.

```js
console.log(myURL.href);
```

Output:

```text
https://example.com/products?id=10&category=laptop
```

---

## `protocol`

```js
console.log(myURL.protocol);
```

Output:

```text
https:
```

---

## `hostname`

```js
console.log(myURL.hostname);
```

Output:

```text
example.com
```

---

## `port`

```js
console.log(myURL.port);
```

Output:

```text
8080
```

(Empty string if no port is specified.)

---

## `pathname`

```js
console.log(myURL.pathname);
```

Output:

```text
/products
```

---

## `hash`

```js
console.log(myURL.hash);
```

Output:

```text
#reviews
```

---

# Working with Query Parameters

The most commonly used feature is **`searchParams`**.

Example URL:

```text
https://example.com/products?id=10&category=laptop
```

---

## Get a Query Parameter

```js
myURL.searchParams.get("id");
```

Output:

```text
10
```

---

## Add a Query Parameter

```js
myURL.searchParams.set("page", "2");
```

Result:

```text
https://example.com/products?id=10&category=laptop&page=2
```

---

## Check if a Parameter Exists

```js
myURL.searchParams.has("id");
```

Returns:

```text
true
```

---

## Delete a Parameter

```js
myURL.searchParams.delete("category");
```

---

# Updating URL Parts

You can modify properties directly.

```js
myURL.pathname = "/users";
myURL.hash = "#profile";
```

Updated URL:

```text
https://example.com/users?id=10#profile
```

---

# Encoding URLs

The `URL` class automatically encodes special characters.

```js
const url = new URL("https://example.com");

url.searchParams.set("name", "John Doe");
```

Result:

```text
https://example.com/?name=John%20Doe
```

---

# Real-World Usage

## Reading Query Parameters

```text
https://example.com/products?id=25
```

Backend:

```js
url.searchParams.get("id");
```

Used to fetch a product by ID.

---

## Pagination

```text
?page=2&limit=20
```

Backend reads:

```js
const page = url.searchParams.get("page");
const limit = url.searchParams.get("limit");
```

---

## Search APIs

```text
/search?q=nodejs
```

Read:

```js
url.searchParams.get("q");
```

---

## Authentication Redirects

```text
/login?redirect=/dashboard
```

Read the `redirect` parameter after login.

---

## Building API URLs

```js
const api = new URL("https://api.example.com/users");

api.searchParams.set("page", "1");
api.searchParams.set("limit", "20");
```

Result:

```text
https://api.example.com/users?page=1&limit=20
```

---

# Most Used Properties & Methods

| Property / Method       | Purpose                         |
| ----------------------- | ------------------------------- |
| `new URL()`             | Create a URL object             |
| `href`                  | Get the full URL                |
| `protocol`              | Get the protocol (`https:`)     |
| `hostname`              | Get the domain name             |
| `port`                  | Get the port number             |
| `pathname`              | Get the path                    |
| `hash`                  | Get the URL fragment            |
| `searchParams.get()`    | Read a query parameter          |
| `searchParams.set()`    | Add or update a query parameter |
| `searchParams.has()`    | Check if a parameter exists     |
| `searchParams.delete()` | Remove a query parameter        |

---

# Best Practices

- ✅ Use the `URL` class instead of manually parsing strings.
- ✅ Use `searchParams` for working with query parameters.
- ✅ Let the `URL` class handle URL encoding automatically.
- ✅ Use `new URL()` whenever you're building or modifying URLs.

---

# Mental Model

```text
URL String

↓

URL Object

↓

Read or Modify

↓

Use in Your Application
```

The `URL` module turns a plain URL string into an object that is easy to inspect and manipulate.

---

# Quick Summary

- The **`URL` module** is used to parse and manipulate URLs.
- `new URL()` creates a URL object.
- `searchParams` makes working with query parameters simple.
- It automatically handles URL encoding.
- It's commonly used in web servers, APIs, authentication, redirects, and HTTP requests.
