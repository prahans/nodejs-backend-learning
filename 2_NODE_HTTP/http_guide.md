# HTTP in Node.js

A practical guide to understanding **HTTP (HyperText Transfer Protocol)** and working with HTTP servers, requests, and responses using Node.js.

---

## Table of Contents

1. [What is HTTP?](#1-what-is-http)
2. [How HTTP Works](#2-how-http-works)
3. [HTTP Request](#3-http-request)
4. [HTTP Response](#4-http-response)
5. [HTTP Methods](#5-http-methods)
6. [HTTP Status Codes](#6-http-status-codes)
7. [HTTP Headers](#7-http-headers)
8. [Request Body](#8-request-body)
9. [URL](#9-url)
10. [Query Parameters](#10-query-parameters)
11. [Route Parameters](#11-route-parameters)
12. [HTTP in Node.js](#12-http-in-nodejs)
13. [Creating an HTTP Server](#13-creating-an-http-server)
14. [The `req` Object](#14-the-req-object)
15. [The `res` Object](#15-the-res-object)
16. [Sending JSON](#16-sending-json)
17. [Handling Different Routes](#17-handling-different-routes)
18. [Handling POST Requests](#18-handling-post-requests)
19. [Reading Request Body](#19-reading-request-body)
20. [Serving Files](#20-serving-files)
21. [HTTP vs HTTPS](#21-http-vs-https)
22. [HTTP with Express.js](#22-http-with-expressjs)
23. [Important Concepts to Remember](#23-important-concepts-to-remember)

---

# 1. What is HTTP?

**HTTP** stands for:

> HyperText Transfer Protocol

HTTP is a communication protocol used between a **client** and a **server**.

For example:

```text
Browser
   |
   | HTTP Request
   ↓
Node.js Server
   |
   | HTTP Response
   ↓
Browser
```

When you visit:

```text
https://example.com
```

your browser sends an HTTP request to the server.

The server processes that request and sends an HTTP response back.

---

# 2. How HTTP Works

HTTP follows a simple:

```text
Request → Response
```

model.

### Example

The browser sends:

```http
GET /users HTTP/1.1
Host: example.com
```

The server might respond:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "John"
  }
]
```

The request contains information about **what the client wants**.

The response contains information about **what the server sends back**.

---

# 3. HTTP Request

An HTTP request is sent from a client to a server.

A request contains several important parts:

```text
HTTP Request
│
├── Method
├── URL
├── Headers
└── Body
```

Example:

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John",
  "age": 25
}
```

Here:

```text
POST              → HTTP method
/users            → URL path
Host              → Header
Content-Type      → Header
JSON              → Request body
```

---

# 4. HTTP Response

The server sends an HTTP response back to the client.

A response contains:

```text
HTTP Response
│
├── Status Code
├── Headers
└── Body
```

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User created successfully"
}
```

Here:

```text
200 OK              → Status code
Content-Type        → Header
JSON                → Response body
```

---

# 5. HTTP Methods

HTTP methods describe **what the client wants to do**.

The most important methods are:

| Method | Purpose                      |
| ------ | ---------------------------- |
| GET    | Retrieve data                |
| POST   | Create data                  |
| PUT    | Replace existing data        |
| PATCH  | Update part of existing data |
| DELETE | Delete data                  |

### GET

Used to retrieve data.

```http
GET /users
```

Example:

```text
GET /products
```

Meaning:

> Give me the products.

---

### POST

Used to create new data.

```http
POST /users
```

Example body:

```json
{
  "name": "John",
  "email": "john@example.com"
}
```

Meaning:

> Create a new user with this data.

---

### PUT

Used to completely replace existing data.

```http
PUT /users/123
```

Example:

```json
{
  "name": "John",
  "email": "new@example.com",
  "age": 30
}
```

---

### PATCH

Used to partially update data.

```http
PATCH /users/123
```

Example:

```json
{
  "age": 31
}
```

Only the specified field needs to change.

---

### DELETE

Used to delete data.

```http
DELETE /users/123
```

Meaning:

> Delete user 123.

---

# 6. HTTP Status Codes

Status codes tell the client what happened with the request.

They are divided into five categories.

```text
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client Error
5xx → Server Error
```

## Common Status Codes

### 200 — OK

Request was successful.

```http
200 OK
```

---

### 201 — Created

Something was successfully created.

Usually used after a successful `POST`.

```http
201 Created
```

---

### 204 — No Content

Request succeeded but there is no response body.

Commonly used with:

```http
DELETE
```

---

### 400 — Bad Request

The client sent invalid data.

```http
400 Bad Request
```

---

### 401 — Unauthorized

Authentication is required or invalid.

```http
401 Unauthorized
```

---

### 403 — Forbidden

The server understands the request but refuses to allow it.

```http
403 Forbidden
```

---

### 404 — Not Found

The requested resource does not exist.

```http
404 Not Found
```

---

### 500 — Internal Server Error

Something went wrong on the server.

```http
500 Internal Server Error
```

---

# 7. HTTP Headers

Headers contain additional information about an HTTP request or response.

Example:

```http
Content-Type: application/json
```

Common request headers:

```text
Host
Content-Type
Authorization
Accept
User-Agent
Cookie
```

Common response headers:

```text
Content-Type
Content-Length
Set-Cookie
Cache-Control
Location
```

---

## Content-Type

`Content-Type` tells the receiver what type of data is being sent.

JSON:

```http
Content-Type: application/json
```

HTML:

```http
Content-Type: text/html
```

Plain text:

```http
Content-Type: text/plain
```

Form data:

```http
Content-Type: application/x-www-form-urlencoded
```

---

# 8. Request Body

The request body contains data sent from the client to the server.

For example:

```http
POST /users
Content-Type: application/json

{
  "name": "John",
  "age": 25
}
```

The body is commonly used with:

```text
POST
PUT
PATCH
```

GET requests generally don't use a request body.

---

# 9. URL

A URL identifies a resource on a server.

Example:

```text
https://example.com/products/123?category=phone
```

It can be broken down into:

```text
https://
   ↓
Protocol

example.com
   ↓
Hostname

/products/123
   ↓
Path

?category=phone
   ↓
Query parameter
```

---

# 10. Query Parameters

Query parameters are additional information added to a URL.

Example:

```text
/products?category=phone&sort=price
```

Here:

```text
category = phone
sort     = price
```

Multiple query parameters are separated by:

```text
&
```

Example:

```text
/users?age=25&country=Nepal
```

Query parameters are commonly used for:

- Filtering
- Searching
- Sorting
- Pagination

Example:

```text
/products?search=laptop
```

---

# 11. Route Parameters

Route parameters are variables inside the URL path.

Example:

```text
/users/123
```

Here:

```text
123
```

could represent the user's ID.

Another example:

```text
/products/456
```

The route can conceptually be:

```text
/products/:id
```

Where:

```text
:id = 456
```

Route parameters are commonly used to identify a specific resource.

---

# 12. HTTP in Node.js

Node.js provides a built-in module called:

```javascript
http;
```

You can use it to create an HTTP server without installing any external package.

Import it using:

```javascript
const http = require("http");
```

With ES modules:

```javascript
import http from "http";
```

---

# 13. Creating an HTTP Server

The simplest Node.js HTTP server:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Start the server:

```bash
node server.js
```

Then visit:

```text
http://localhost:3000
```

You should see:

```text
Hello World!
```

---

# 14. The `req` Object

The `req` object represents the incoming HTTP request.

Example:

```javascript
const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
});
```

Important properties include:

```javascript
req.method;
req.url;
req.headers;
```

---

## `req.method`

Returns the HTTP method.

Example:

```javascript
console.log(req.method);
```

Possible values:

```text
GET
POST
PUT
PATCH
DELETE
```

---

## `req.url`

Returns the requested URL.

Example:

```javascript
console.log(req.url);
```

If the browser requests:

```text
/products?page=2
```

you might get:

```text
/products?page=2
```

---

## `req.headers`

Contains request headers.

Example:

```javascript
console.log(req.headers);
```

You might see:

```javascript
{
  host: "localhost:3000",
  connection: "keep-alive",
  accept: "*/*"
}
```

---

# 15. The `res` Object

The `res` object represents the response that Node.js sends back to the client.

Important methods include:

```javascript
res.writeHead();
res.setHeader();
res.write();
res.end();
```

---

## `res.statusCode`

Set the response status code:

```javascript
res.statusCode = 200;
```

Example:

```javascript
res.statusCode = 404;
res.end("Page not found");
```

---

## `res.setHeader()`

Set a response header:

```javascript
res.setHeader("Content-Type", "text/plain");
```

---

## `res.write()`

Send part of the response.

```javascript
res.write("Hello ");
res.write("World");
res.end();
```

Response:

```text
Hello World
```

---

## `res.end()`

Ends the response.

```javascript
res.end("Hello World");
```

**Important:** Once `res.end()` is called, you cannot continue sending data.

---

# 16. Sending JSON

When building APIs, you'll frequently send JSON.

Example:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  const data = {
    name: "John",
    age: 25,
  };

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(data));
});

server.listen(3000);
```

Why do we use `JSON.stringify()`?

Because JavaScript objects need to be converted into a JSON string before being sent as the HTTP response body.

```javascript
JSON.stringify({
  name: "John",
});
```

Produces:

```json
{ "name": "John" }
```

---

# 17. Handling Different Routes

You can use `req.url` and `req.method` to implement simple routing.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("Home Page");
  } else if (req.url === "/about" && req.method === "GET") {
    res.end("About Page");
  } else if (req.url === "/users" && req.method === "GET") {
    res.end("Users Page");
  } else {
    res.statusCode = 404;
    res.end("Route not found");
  }
});

server.listen(3000);
```

Now:

```text
GET /
```

returns:

```text
Home Page
```

And:

```text
GET /about
```

returns:

```text
About Page
```

---

# 18. Handling POST Requests

A POST request contains data in the request body.

Example:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "POST") {
    // Read request body here
  }
});

server.listen(3000);
```

But there's an important concept:

> The request body arrives as a stream.

You need to listen for incoming chunks.

---

# 19. Reading Request Body

Example:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log(body);

      res.end("User received");
    });
  }
});

server.listen(3000);
```

The process is:

```text
Client
  |
  | POST request
  ↓
Node.js
  |
  | data chunks
  ↓
body
  |
  | end
  ↓
Process complete body
```

If the client sends:

```json
{
  "name": "John",
  "age": 25
}
```

you can convert it into a JavaScript object:

```javascript
const user = JSON.parse(body);
```

Complete example:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const user = JSON.parse(body);

      console.log(user);

      res.statusCode = 201;
      res.end("User created");
    });
  }
});

server.listen(3000);
```

---

# 20. Serving Files

Node.js can also send files as HTTP responses.

For example:

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Server error");
        return;
      }

      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});

server.listen(3000);
```

This allows Node.js to send an HTML file to the browser.

---

# 21. HTTP vs HTTPS

HTTP:

```text
http://example.com
```

HTTPS:

```text
https://example.com
```

HTTPS is HTTP with encryption provided through TLS.

### HTTP

```text
Client
   ↓
HTTP
   ↓
Server
```

### HTTPS

```text
Client
   ↓
Encrypted HTTP
   ↓
Server
```

HTTPS protects data while it travels between the client and server.

For production applications, you normally want HTTPS.

---

# 22. HTTP with Express.js

When working with Node.js professionally, you will often use **Express.js** instead of manually handling everything with the built-in `http` module.

Without Express:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.end("Users");
  }
});
```

With Express:

```javascript
const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  res.send("Users");
});

app.listen(3000);
```

Express makes routing, middleware, request parsing, error handling, and API development much easier.

However, understanding the Node.js `http` module is valuable because Express itself is built on top of Node's HTTP capabilities.

---

# 23. Important Concepts to Remember

If you're learning Node.js backend development, make sure you understand these concepts well:

### HTTP fundamentals

```text
Request
Response
Methods
Status codes
Headers
Body
URL
Query parameters
Route parameters
```

### Node.js HTTP

```text
http.createServer()
req
res
req.method
req.url
req.headers
res.statusCode
res.setHeader()
res.write()
res.end()
```

### Request body

Understand:

```text
Streams
data event
end event
JSON.parse()
JSON.stringify()
```

---

# HTTP Mental Model

A useful way to think about HTTP is:

```text
                 HTTP
                  │
        ┌─────────┴─────────┐
        │                   │
     REQUEST             RESPONSE
        │                   │
   ┌────┼────┐         ┌────┼────┐
   │    │    │         │    │    │
Method URL Headers   Status Headers
            │                  │
           Body               Body
```

For example:

```text
POST /users
Content-Type: application/json

{
  "name": "John"
}
```

↓

Node.js receives the request.

↓

Your application processes it.

↓

```text
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "User created"
}
```

---

# Recommended Learning Order

If your goal is **Node.js backend development**, learn HTTP in this order:

```text
1. HTTP Request / Response
        ↓
2. HTTP Methods
        ↓
3. Status Codes
        ↓
4. Headers
        ↓
5. URL + Query Parameters
        ↓
6. Request Body
        ↓
7. JSON
        ↓
8. Node.js http module
        ↓
9. Streams
        ↓
10. Express.js
        ↓
11. REST APIs
        ↓
12. Authentication
        ↓
13. Databases
        ↓
14. Production Backend
```

## The Most Important Idea

Don't memorize every HTTP detail.

For Node.js backend development, you should be able to look at this:

```http
POST /api/users
Content-Type: application/json
Authorization: Bearer token

{
  "name": "John"
}
```

and immediately understand:

```text
POST
 ↓
Create something

/api/users
 ↓
Users endpoint

Content-Type
 ↓
Body is JSON

Authorization
 ↓
Authentication information

Body
 ↓
Data sent by the client
```

Then understand how Node.js receives it, processes it, and sends back:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 123,
  "name": "John"
}
```

That mental model is the foundation for building **REST APIs with Node.js and Express.js**.
