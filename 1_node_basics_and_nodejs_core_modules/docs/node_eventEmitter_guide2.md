# 📚 Lesson 3 — Managing Listeners

Welcome back! 👨‍🏫

We're continuing exactly where we left off.

---

# 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- ✅ How to remove listeners
- ✅ Why removing listeners matters
- ✅ `off()`
- ✅ `removeListener()`
- ✅ `removeAllListeners()`
- ✅ `listenerCount()`
- ✅ `listeners()`
- ✅ `eventNames()`
- ✅ `setMaxListeners()`
- ✅ Memory leak warnings
- ✅ Real-world examples
- ✅ Interview questions

---

# 🍽️ Imagine a Real Restaurant

Let's continue using one analogy throughout this lesson.

Imagine your Node.js application is a restaurant.

- **EventEmitter** → Restaurant Manager
- **Listeners** → Waiters

```
Manager
│
├── Waiter A
├── Waiter B
├── Waiter C
└── Waiter D
```

When a new order arrives...

```javascript
manager.emit("newOrder");
```

Every waiter reacts.

Simple enough.

---

## 🤔 But What If One Waiter Quits?

Should the manager still try to notify that waiter?

**No.**

The manager must remove them.

That's exactly what this lesson is about.

---

# Part 1 — Removing One Listener

Node provides two methods:

- `off()`
- `removeListener()`

They do exactly the same thing.

## Example

```javascript
const EventEmitter = require("events");

const restaurant = new EventEmitter();

function waiter(order) {
  console.log("Serving:", order);
}

restaurant.on("order", waiter);

restaurant.emit("order", "Pizza");
```

### Output

```text
Serving: Pizza
```

Now remove the listener.

```javascript
restaurant.off("order", waiter);

restaurant.emit("order", "Burger");
```

### Output

```text
(nothing)
```

Because the listener has been removed.

---

## Visual Representation

### Before

```
order
│
├── waiter
```

### After

```
order
│
└── (empty)
```

---

# ❓ Why Do We Pass the Function?

Many beginners ask:

> Why can't Node just remove the listener?

Imagine a classroom.

The teacher says:

> "Remove the student."

Which student?

There are 50 students.

Node has the same problem.

It needs the **exact function reference**.

```javascript
function waiter() {}

restaurant.off("order", waiter);
```

This removes **that specific function**.

---

# 🚫 Common Beginner Mistake

This **doesn't work**:

```javascript
restaurant.on("order", function () {
  console.log("Food");
});

restaurant.off("order", function () {
  console.log("Food");
});
```

Nothing gets removed.

### Why?

Because those are **two different function objects**.

Think of it like this:

```javascript
const a = {};
const b = {};

console.log(a === b);
```

### Output

```text
false
```

Functions are objects too.

These are different:

```javascript
function () {}
```

and

```javascript
function () {}
```

Even if they look identical.

---

# ✅ Correct Way

Always store the function.

```javascript
function serveFood() {
  console.log("Serving");
}

restaurant.on("order", serveFood);

restaurant.off("order", serveFood);
```

Always.

---

# Anonymous Functions vs Named Functions

## ❌ Anonymous Function

```javascript
emitter.on("event", () => {
  console.log("Hello");
});
```

Looks nice.

But...

Can you remove it later?

**No.**

Because you no longer have the function reference.

---

## ✅ Named Function

```javascript
function greet() {
  console.log("Hello");
}

emitter.on("event", greet);

emitter.off("event", greet);
```

Much better.

---

# 🌍 Real-World Example

Suppose a user logs into a chat application.

```javascript
chat.on("message", sendNotification);
```

When they log out...

```javascript
chat.off("message", sendNotification);
```

Otherwise...

Even logged-out users continue receiving notifications.

That's a bug.

---

# Part 2 — `removeListener()`

```javascript
emitter.removeListener(eventName, listener);
```

Example:

```javascript
emitter.removeListener("order", waiter);
```

This is exactly the same as:

```javascript
emitter.off("order", waiter);
```

Node introduced `off()` because it's shorter and more intuitive.

Today, most codebases use:

```javascript
off();
```

---

# Which Should You Use?

✅ Use:

```javascript
off();
```

Unless you're maintaining older Node.js projects.

---

# Part 3 — `removeAllListeners()`

Imagine shutting down the restaurant.

You don't want to remove one waiter.

You want **everyone** gone.

### Before

```
order
├── Waiter A
├── Waiter B
├── Waiter C
└── Waiter D
```

```javascript
restaurant.removeAllListeners("order");
```

### After

```
order
(empty)
```

---

## Example

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => console.log("A"));
emitter.on("login", () => console.log("B"));
emitter.on("login", () => console.log("C"));

emitter.removeAllListeners("login");

emitter.emit("login");
```

### Output

```text
(nothing)
```

---

## Remove Every Listener

You can also remove **every listener for every event**.

```javascript
emitter.removeAllListeners();
```

Now the EventEmitter is completely clean.

---

# When Is `removeAllListeners()` Useful?

Suppose your application is shutting down.

Instead of doing:

```javascript
off(...);
off(...);
off(...);
off(...);
```

Simply call:

```javascript
removeAllListeners();
```

Much cleaner.

---

# ⚠️ Be Careful

Imagine an Express application.

Many parts of the application register listeners.

```
Database
API
Logger
Authentication
Cache
Monitoring
```

If somewhere you do:

```javascript
emitter.removeAllListeners();
```

Everything disappears.

Your application may stop working in unexpected ways.

Use this method only when you're sure it's appropriate—for example:

- Application shutdown
- Object cleanup
- Resource disposal

---

# 🧠 Key Takeaways

| Method                        | Purpose                               |
| ----------------------------- | ------------------------------------- |
| `off()`                       | Remove one listener                   |
| `removeListener()`            | Same as `off()`                       |
| `removeAllListeners("event")` | Remove every listener for one event   |
| `removeAllListeners()`        | Remove every listener for every event |

---

# 📝 Exercise 1 — Hands-On Practice

Create a file:

```text
lesson3-part1.js
```

Complete the following tasks:

1. Create an `EventEmitter`.
2. Create a named function called `welcomeUser`.
3. Register it for the `"login"` event.
4. Emit `"login"` once.
5. Remove the listener using `off()`.
6. Emit `"login"` again.
7. Observe the output.
8. Add **three** listeners to a `"logout"` event.
9. Emit `"logout"` once.
10. Call:

```javascript
removeAllListeners("logout");
```

11. Emit `"logout"` again.

---

## Expected Behavior

### Login

First emit:

```text
Welcome User
```

Second emit:

```text
(nothing)
```

---

### Logout

First emit:

```text
Listener 1
Listener 2
Listener 3
```

Second emit:

```text
(nothing)
```

---

# 🤔 Think Before You Code

Try answering these before moving on.

1. Why can't you remove an anonymous listener later?
2. What is the difference between `off()` and `removeListener()`?
3. When is `removeAllListeners()` useful?
4. Why can `removeAllListeners()` be dangerous in a large application?

Don't worry if you're unsure—attempting to answer helps build deeper understanding.

---

# ✅ End of Lesson 3 — Part 1

In the next part of Lesson 3, we'll cover:

- `listenerCount()`
- `listeners()`
- `eventNames()`
- `setMaxListeners()`
- Memory leak warnings
- Why too many listeners are dangerous
- Real-world Node.js and Express examples
- Exercises
- Interview questions
