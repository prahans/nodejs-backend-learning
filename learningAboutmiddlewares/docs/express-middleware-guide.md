# Middleware in Express.js

## 1. First: forget the definition for a moment

Imagine your backend receives this request:

```text
POST /api/questions
        ↓
   Authentication
        ↓
   Authorization
        ↓
   Validate request
        ↓
   Log request
        ↓
   Controller
        ↓
   Database
        ↓
   Response
```

Those things in the middle are **middleware**.

A middleware is basically a function that gets a chance to work with the request **before the final response is sent**.

The basic shape is:

```ts
(req, res, next) => {
  // do something

  next();
};
```

The important word is:

> **next()**

It tells Express:

> "I'm done. Continue to the next middleware."

---

# 2. Your first middleware

Create a small project.

```bash
mkdir express-middleware
cd express-middleware

npm init -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

`package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts"
  }
}
```

Create:

```text
src/
  index.ts
```

Then:

```ts
import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Run:

```bash
npm run dev
```

Go to:

```text
http://localhost:3000
```

You'll see:

```text
Hello World
```

And your terminal:

```text
Middleware executed
```

---

# 3. What actually happened?

When you requested:

```text
GET /
```

Express essentially went through:

```text
Request
   ↓
app.use(middleware)
   ↓
next()
   ↓
app.get("/")
   ↓
Response
```

That's the fundamental idea.

---

# 4. Experiment #1 — Remove `next()`

Now change:

```ts
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});
```

to:

```ts
app.use((req, res, next) => {
  console.log("Middleware executed");
});
```

Refresh the browser.

What happens?

You'll probably see the browser continuously waiting.

Why?

Because Express reached:

```ts
console.log("Middleware executed");
```

and then stopped.

You didn't:

```ts
next();
```

and you didn't:

```ts
res.send(...);
```

So the request is stuck.

### Mental model

Every middleware needs to do **one of two things**:

```text
1. Continue the request
       ↓
     next()

OR

2. Finish the request
       ↓
   res.send()
```

If it does neither:

```text
💀 Request gets stuck
```

This is one of the most important middleware concepts.

---

# 5. Middleware can modify `req`

This is where middleware becomes extremely useful.

Try:

```ts
app.use((req, res, next) => {
  console.log("URL:", req.url);
  console.log("Method:", req.method);

  next();
});
```

Now request:

```text
GET /users
```

You'll get:

```text
URL: /users
Method: GET
```

Middleware can inspect:

```ts
req.method;
req.url;
req.headers;
req.params;
req.query;
req.body;
```

and much more.

---

# 6. Middleware can also modify the request

For example:

```ts
app.use((req, res, next) => {
  req.user = {
    id: "123",
    username: "prahans",
  };

  next();
});
```

Then later:

```ts
app.get("/profile", (req, res) => {
  res.json({
    message: "Profile",
    user: req.user,
  });
});
```

Conceptually:

```text
Incoming request
       ↓
Middleware adds user
       ↓
req.user
       ↓
Controller uses req.user
```

This pattern becomes extremely important when you implement **authentication**.

---

# 7. Middleware can modify `res`

It can also interact with the response.

For example:

```ts
app.use((req, res, next) => {
  res.setHeader("X-Custom-Header", "Hello");

  next();
});
```

Now every response gets:

```text
X-Custom-Header: Hello
```

This idea is used heavily for:

- security headers
- CORS
- caching
- cookies
- response formatting

---

# 8. Middleware runs in order

This is **extremely important**.

Look at:

```ts
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 3");
  next();
});

app.get("/", (req, res) => {
  console.log("Route");
  res.send("Hello");
});
```

Request `/`.

Output:

```text
Middleware 1
Middleware 2
Middleware 3
Route
```

Express processes them **in the order you register them**.

Think:

```text
                    Express
                       │
                       ▼
                Middleware 1
                       │
                     next()
                       │
                       ▼
                Middleware 2
                       │
                     next()
                       │
                       ▼
                Middleware 3
                       │
                     next()
                       │
                       ▼
                    Route
                       │
                       ▼
                   Response
```

---

# 9. This is why middleware order matters

Suppose:

```ts
app.use(authMiddleware);

app.get("/profile", profileController);
```

Authentication happens before `/profile`.

Good.

But:

```ts
app.get("/profile", profileController);

app.use(authMiddleware);
```

The `/profile` request already reached the controller.

Your authentication middleware is too late.

### Golden rule

> **Middleware only affects requests that reach it.**

Therefore, ordering matters.

---

# 10. `app.use()` vs route middleware

You will see both.

### Global middleware

```ts
app.use(logger);
```

This can run for many/all routes.

### Route-specific middleware

```ts
app.get("/profile", authMiddleware, profileController);
```

Here:

```text
GET /profile
     ↓
authMiddleware
     ↓
profileController
```

But:

```text
GET /products
```

doesn't go through `authMiddleware`.

---

# 11. Real-world example: Logger

Create:

```text
src/
  index.ts
  middleware/
    logger.ts
```

`logger.ts`:

```ts
import type { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl}`);

  next();
}
```

Then:

```ts
import express from "express";
import { logger } from "./middleware/logger.js";

const app = express();

app.use(logger);

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/users", (req, res) => {
  res.send("Users");
});

app.listen(3000);
```

Now:

```text
GET /
GET /users
GET /favicon.ico
```

will be logged.

This is an actual production pattern.

Real applications often use logging middleware such as Morgan or more sophisticated structured logging systems.

---

# 12. Real-world example: Authentication

This is where middleware becomes **very important for your Quora project**.

Imagine:

```text
POST /api/questions
```

You want only authenticated users to create questions.

Instead of putting authentication inside every controller:

```ts
app.post("/questions", (req, res) => {
  // check authentication
  // create question
});
```

You do:

```ts
app.post("/questions", authenticate, createQuestion);
```

So:

```text
POST /questions
       ↓
authenticate
       ↓
   valid?
    /   \
  no     yes
  ↓       ↓
401    controller
          ↓
       database
```

This is one of the major reasons middleware exists.

---

# 13. Authentication middleware example

Later you'll build something like:

```ts
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  // verify token...

  next();
}
```

Then:

```ts
app.get("/profile", authenticate, getProfile);
```

Notice:

```ts
return res.status(...)
```

Why `return`?

Because you don't want execution to continue.

Without careful control, you could accidentally do:

```ts
res.status(401).json(...);

next();
```

which means:

```text
❌ Unauthorized
      ↓
but continue anyway
```

That's a common beginner mistake.

---

# 14. Middleware can have multiple stages

This is where backend architecture starts becoming interesting.

Imagine:

```ts
app.post(
  "/questions",
  authenticate,
  authorize("user"),
  validateQuestion,
  createQuestion,
);
```

Request goes through:

```text
Request
   ↓
authenticate
   ↓
authorize
   ↓
validateQuestion
   ↓
controller
   ↓
service
   ↓
database
```

Each function has **one responsibility**.

That's good backend design.

---

# 15. Built-in Express middleware

Express itself provides middleware.

For example:

```ts
app.use(express.json());
```

You've probably already encountered this.

It parses JSON request bodies.

Without it, this:

```http
POST /users
Content-Type: application/json

{
  "username": "prahans"
}
```

may result in:

```ts
req.body;
```

being undefined.

That's actually very similar to the problem you encountered recently in your Node/Express project.

With:

```ts
app.use(express.json());
```

you can do:

```ts
app.post("/users", (req, res) => {
  console.log(req.body);

  res.json(req.body);
});
```

---

# 16. `express.json()` is middleware

This is an important realization.

When you write:

```ts
app.use(express.json());
```

you're basically saying:

```text
Incoming request
       ↓
JSON parser middleware
       ↓
req.body populated
       ↓
your route
```

So middleware isn't some special mysterious Express feature.

A lot of Express functionality is built around middleware.

---

# 17. Middleware categories

You should learn these categories.

### 1. Application-level middleware

```ts
app.use(logger);
```

### 2. Router-level middleware

```ts
router.use(authenticate);
```

### 3. Built-in middleware

```ts
express.json();
express.urlencoded();
express.static();
```

### 4. Third-party middleware

Examples:

```text
cors
helmet
morgan
cookie-parser
```

### 5. Custom middleware

Your own:

```ts
authenticate();
authorize();
validate();
logger();
errorHandler();
```

---

# 18. Router-level middleware

This becomes extremely useful once your application grows.

Suppose:

```text
routes/
  user.routes.ts
  question.routes.ts
  admin.routes.ts
```

You can do:

```ts
const router = Router();

router.use(authenticate);

router.get("/profile", getProfile);
router.get("/settings", getSettings);
router.post("/questions", createQuestion);
```

Now every route in that router goes through:

```text
authenticate
```

You don't have to repeatedly write:

```ts
router.get("/profile", authenticate, ...)

router.get("/settings", authenticate, ...)

router.post("/questions", authenticate, ...)
```

---

# 19. Error-handling middleware

This is another **very important concept**.

Normal middleware:

```ts
(req, res, next) => {};
```

Error middleware has **four parameters**:

```ts
(err, req, res, next) => {};
```

Example:

```ts
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong",
  });
}
```

Then:

```ts
app.use(errorHandler);
```

The four parameters tell Express:

> "This is an error-handling middleware."

---

# 20. How errors reach it

Suppose:

```ts
app.get("/users", async (req, res, next) => {
  try {
    throw new Error("Database failed");
  } catch (error) {
    next(error);
  }
});
```

The error travels to:

```text
Route
  ↓
next(error)
  ↓
Error middleware
  ↓
500 response
```

This gives you centralized error handling.

Instead of doing this everywhere:

```ts
res.status(500).json(...)
```

you can centralize it.

---

# 21. Your first serious exercise

Don't just read this.

**Build it yourself.**

Create:

```text
src/
├── index.ts
└── middleware/
    ├── logger.ts
    ├── auth.ts
    └── errorHandler.ts
```

Your application should have:

```text
GET  /
GET  /public
GET  /profile
GET  /admin
```

Implement the following.

### Exercise 1 — Logger

Create a middleware that prints:

```text
[GET] /profile
```

for every request.

---

### Exercise 2 — Request timer

Create middleware that measures how long a request takes.

Expected output:

```text
GET /profile - 12ms
```

Hint:

```ts
const start = Date.now();

next();

const duration = Date.now() - start;
```

But think carefully about **when** you want to log the duration.

---

### Exercise 3 — Authentication

Create:

```ts
authenticate;
```

If request doesn't contain:

```http
Authorization: Bearer secret123
```

return:

```json
{
  "message": "Unauthorized"
}
```

with:

```text
401
```

Otherwise:

```ts
next();
```

---

### Exercise 4 — Protected route

Make:

```text
GET /profile
```

protected.

So:

```text
GET /profile
        ↓
authenticate
        ↓
     valid?
      /   \
    no     yes
    ↓       ↓
  401     profile
```

---

### Exercise 5 — Admin middleware

Create:

```ts
authorizeAdmin;
```

For now, pretend the user has a role:

```ts
"admin";
```

Only admin users can access:

```text
GET /admin
```

---

# 22. Experiment: change middleware order

Try:

```ts
app.use(logger);
app.use(authenticate);
```

Then try:

```ts
app.use(authenticate);
app.use(logger);
```

Observe what happens.

Then change it to:

```ts
app.use(authenticate);

app.get("/public", ...);
```

Ask yourself:

> Why is `/public` now protected?

Then move authentication to:

```ts
app.get("/profile", authenticate, ...);
```

This experiment will teach you more than memorizing definitions.

---

# 23. Your next level: middleware pipeline

Eventually I want you to look at code like this:

```ts
router.post(
  "/questions",
  authenticate,
  authorize("user"),
  validate(createQuestionSchema),
  createQuestion,
);
```

and immediately understand:

```text
Request
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
Controller
```

That is the mindset I want you to develop as a backend developer.

---

# 24. Mentor tip: don't make middleware a dumping ground

A common beginner mistake is creating one giant middleware:

```ts
function everything(req, res, next) {
  // authentication
  // authorization
  // validation
  // database
  // business logic
  // logging
  // response
}
```

❌ Don't do this.

Prefer:

```text
authenticate
authorize
validate
controller
service
repository
```

Each layer has a job.

---

# 25. Middleware vs Controller

This distinction is important.

### Middleware

Usually answers:

> "Should this request continue?"

Examples:

```text
Is user authenticated?
Is user authorized?
Is request valid?
Should I log this?
Should I add information to req?
```

### Controller

Usually answers:

> "What should happen for this endpoint?"

Example:

```ts
async function createQuestion(req, res) {
  const question = await Question.create({
    title: req.body.title,
    content: req.body.content,
  });

  res.status(201).json(question);
}
```

So mentally:

```text
Middleware
   ↓
Can this request proceed?
   ↓
Controller
   ↓
What should this endpoint do?
```

---

# 26. The middleware knowledge you should master

Don't move on until you're comfortable with these:

```text
✓ req
✓ res
✓ next
✓ app.use()
✓ middleware execution order
✓ global middleware
✓ route middleware
✓ router middleware
✓ modifying req
✓ modifying res
✓ terminating requests
✓ next()
✓ next(error)
✓ error-handling middleware
✓ express.json()
✓ authentication middleware
✓ authorization middleware
✓ validation middleware
```

And then we'll connect this directly to:

```text
Authentication
       ↓
JWT
       ↓
Authorization
       ↓
Password hashing
       ↓
Cookies
       ↓
Sessions
       ↓
MongoDB
```

That would be the natural next stage for your backend learning.

**One important teaching rule from me:** don't copy the exercises from this answer. Try writing them yourself first. If you get an error, bring me your **code + error**, and I'll guide you toward finding the problem rather than immediately giving you the solution. That's how we'll make you actually understand Node/Express instead of just completing tutorials.
