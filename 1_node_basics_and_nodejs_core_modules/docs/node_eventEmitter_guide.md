# EventEmitter in Node.js

## Lesson 1: What Problem Does EventEmitter Solve?

Imagine you're building a restaurant.

### Without Events

```text
Customer orders food
        │
        ▼
Chef cooks
        │
        ▼
Chef directly calls waiter
        │
        ▼
Waiter serves food
```

Everything is tightly connected.

If tomorrow you add:

- SMS notification
- Billing
- Loyalty points

The chef now has to know about all of them.

```text
Chef
 ├── Waiter
 ├── SMS
 ├── Billing
 └── Loyalty
```

This becomes messy.

---

## With Events

The chef simply says:

> **"Food is ready!"**

He doesn't care who hears it.

```text
Chef
   │
   │ emit("foodReady")
   ▼

      Event

  Waiter hears it
  SMS hears it
  Billing hears it
  Loyalty hears it
```

The chef knows nothing about the listeners.

This is called the **Publisher → Subscribers** pattern.

---

## In Node.js

Node has many things happening:

- File finished reading
- HTTP request received
- Database connected
- Timer completed
- Stream received data

Instead of constantly asking:

```text
Is it done?
Is it done?
Is it done?
Is it done?
```

Node simply emits an event.

```text
"done"
```

Anyone interested reacts.

That's **EventEmitter**.

---

# EventEmitter Analogy

Imagine a YouTube channel.

```text
Channel
```

Subscribers:

```text
Alice
Bob
Charlie
David
```

When the channel uploads a video...

```text
Channel emits

"newVideo"
```

Everyone subscribed gets notified.

The channel doesn't know who is watching.

Exactly like **EventEmitter**.

---

# Creating an EventEmitter

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();
```

Think of `emitter` as a radio station.

Nothing happens until someone listens.

---

# `on()`

Registers a listener.

```javascript
emitter.on("login", () => {
  console.log("User logged in");
});
```

Meaning:

> Whenever `"login"` happens, run this function.

Visualization:

```text
login event

↓

Listener

↓

console.log(...)
```

Nothing prints yet.

Because no event has happened.

---

# `emit()`

Now trigger the event.

```javascript
emitter.emit("login");
```

### Output

```text
User logged in
```

Flow:

```text
emit("login")

↓

Node looks for everyone listening

↓

Runs every callback
```

---

## Visual

```text
on("login")

      │

      ▼

callback stored

──────────────

emit("login")

      │

      ▼

callback executes
```

---

# Multiple Listeners

An event can have many listeners.

```javascript
emitter.on("login", () => {
  console.log("Update dashboard");
});

emitter.on("login", () => {
  console.log("Save login history");
});

emitter.on("login", () => {
  console.log("Send email");
});
```

Now:

```javascript
emitter.emit("login");
```

### Output

```text
Update dashboard
Save login history
Send email
```

One event.

Three listeners.

This is extremely common.

---

# Passing Data

Events can send data.

```javascript
emitter.on("login", (username) => {
  console.log(username);
});

emitter.emit("login", "Prahans");
```

### Output

```text
Prahans
```

You can pass multiple values.

```javascript
emitter.emit("login", "Prahans", 22);
```

Listener:

```javascript
emitter.on("login", (name, age) => {
  console.log(name, age);
});
```

---

# `once()`

Sometimes an event should happen only once.

Example:

```text
Database connected
```

Once connected...

No need to connect again.

```javascript
emitter.once("connected", () => {
  console.log("Database Connected");
});
```

Now:

```javascript
emitter.emit("connected");
emitter.emit("connected");
emitter.emit("connected");
```

### Output

```text
Database Connected
```

Only once.

Internally, Node removes the listener after the first execution.

---

# `listeners()`

Suppose you forgot who is listening.

```javascript
emitter.on("login", () => {});
emitter.on("login", () => {});
```

Now:

```javascript
console.log(emitter.listeners("login"));
```

Returns an array of the registered callback functions.

Useful for debugging.

---

# `listenerCount()`

A more useful method.

```javascript
console.log(emitter.listenerCount("login"));
```

### Output

```text
2
```

Meaning:

```text
Two functions
are waiting for "login".
```

---

# Real World Example 1

A user registers.

Instead of:

```javascript
createUser();

sendEmail();

giveReward();

saveAnalytics();

notifyAdmin();
```

Do this:

```javascript
createUser();

emitter.emit("userCreated", user);
```

Then:

- Email service listens
- Analytics listens
- Reward system listens
- Admin notification listens

Each module is independent.

---

# Real World Example 2

## HTTP Server

Client makes request

↓

Node emits

```text
request
```

Server listens

```javascript
server.on("request", (req, res) => {});
```

You never call this yourself.

Node emits it internally.

---

# Real World Example 3

## Streams

```javascript
stream.on("data", (chunk) => {});
```

Every time data arrives

↓

Node emits

```text
data
```

---

# Real World Example 4

## File Reading

When reading finishes,

Node emits:

```text
close
```

or

```text
end
```

depending on the API.

---

# How Node Uses Events Internally

Many core modules inherit from `EventEmitter`.

### HTTP Server

```text
HTTP Server

↓

EventEmitter

↓

request event
```

### Readable Stream

```text
Readable Stream

↓

EventEmitter

↓

data
end
close
error
```

### Process

```text
Process

↓

EventEmitter

↓

exit
warning
SIGINT
```

Once you understand `EventEmitter`, many Node.js APIs start feeling consistent because they all follow the same pattern.

---

# Mental Model

Think of `EventEmitter` as a radio station.

### `on()`

```text
"I want to hear this radio station."
```

### `emit()`

```text
"The radio station broadcasts."
```

### `once()`

```text
"Hear only the first broadcast."
```

### `listeners()`

```text
"Who is listening?"
```

---

# Exercises

## Exercise 1 (Easy)

Create an event named `"welcome"`.

When emitted, print:

```text
Welcome to Node.js
```

---

## Exercise 2

Create two listeners for `"login"`.

Expected output:

```text
Saving login history
Updating dashboard
```

Emit the event once.

---

## Exercise 3

Pass user information.

Expected output:

```text
Name: Prahans
Age: 22
```

Hint:

```javascript
emit("user", ...)
```

---

## Exercise 4

Use `once()`.

Emit `"start"` three times.

It should print only one time.

---

## Exercise 5

Register three listeners.

Print:

```javascript
emitter.listenerCount("order");
```

What number do you get?

---

## Exercise 6 (Real World)

Simulate an e-commerce order.

When an `"orderPlaced"` event is emitted with an `order` object, create separate listeners that:

- Print `Sending confirmation email...`
- Print `Updating inventory...`
- Print `Creating invoice...`
- Print `Logging analytics...`

All should receive the same `order` data.

---

# Challenge Project (Recommended)

## Mini Food Delivery System

When the customer places an order:

```javascript
emitter.emit("orderPlaced", order);
```

Create separate listeners for:

- 🍳 Kitchen starts cooking
- 📧 Customer receives a confirmation email
- 📦 Inventory is updated
- 💳 Payment is recorded
- 🚚 Delivery is assigned
- 📊 Analytics logs the order

The goal is to keep each responsibility in its own listener instead of putting everything into one function. This demonstrates how events help decouple different parts of an application.

---

# Key Takeaways

By the end of this lesson, you should remember these four ideas:

1. **EventEmitter enables communication through events**, reducing direct dependencies between modules.
2. **`on(event, listener)` registers a listener** that runs every time the event is emitted.
3. **`emit(event, ...args)` triggers the event** and passes data to all registered listeners.
4. **`once(event, listener)` runs only the first time** the event is emitted and then automatically removes the listener.

---

# Learning Roadmap

As your mentor, I recommend learning this in two stages.

## Stage 1

Master `EventEmitter` itself.

Learn:

- `on()`
- `emit()`
- `once()`
- Passing data
- Multiple listeners
- `listenerCount()`
- `listeners()`

---

## Stage 2

Learn how Node.js core modules are built on top of `EventEmitter`.

Examples:

- HTTP Server
- Streams
- Process
- Sockets
- File System

At that point, you'll understand not just the API, but the **event-driven architecture** that makes Node.js powerful.

# EventEmitter in Node.js

# Lesson 2 — The EventEmitter Lifecycle

## Learning Objectives

By the end of this lesson, you'll know:

- ✅ What happens inside `emit()`
- ✅ Why `emit()` is synchronous
- ✅ In what order listeners execute
- ✅ What happens if one listener throws an error
- ✅ What happens when no listeners exist
- ✅ What happens if listeners are added or removed during an event
- ✅ Common interview questions about `EventEmitter`

---

# First Question

When you write:

```javascript
emitter.emit("login");
```

What do you think Node does?

Many beginners imagine something like this:

```text
emit()

↓

Background thread

↓

Some magic

↓

Callback runs later
```

❌ This is **wrong**.

---

# The Truth

Imagine your `EventEmitter` is just a notebook.

Initially:

```text
EventEmitter

login  →  []
logout →  []
error  →  []
```

Nothing is listening.

---

Now you register listeners.

```javascript
emitter.on("login", () => {
  console.log("Update dashboard");
});

emitter.on("login", () => {
  console.log("Save history");
});
```

Internally, you can imagine something like:

```text
login

↓

[
   callback1,
   callback2
]
```

That's it.

No magic.

Just stored functions.

---

# What `emit()` Really Does

When you call:

```javascript
emitter.emit("login");
```

Mentally imagine Node doing this:

```javascript
for (const listener of listeners["login"]) {
  listener();
}
```

That's basically the idea.

It simply loops through every registered callback and calls it.

---

## Visual

Before:

```text
login

↓

[
 callback1,
 callback2,
 callback3
]
```

After `emit("login")`:

```text
Run callback1

↓

Run callback2

↓

Run callback3

↓

Done
```

---

# Important Question

Does it wait?

**Yes.**

It waits for **every listener** to finish.

Example:

```javascript
emitter.on("test", () => {
  console.log("A");
});

emitter.on("test", () => {
  console.log("B");
});

console.log("Before");

emitter.emit("test");

console.log("After");
```

## Predict the output before scrolling.

.

.

.

.

### Output

```text
Before
A
B
After
```

Notice:

`After` prints **last**.

That proves `emit()` waited.

---

# `emit()` is Synchronous

This is one of the biggest interview questions.

People often think:

> Events = asynchronous

No.

The event itself is synchronous.

Example:

```javascript
emitter.on("login", () => {
  console.log("Listener");
});

console.log("1");

emitter.emit("login");

console.log("2");
```

### Output

```text
1
Listener
2
```

If it were asynchronous, you'd see:

```text
1
2
Listener
```

But you don't.

---

# Why?

Because `emit()` literally calls the function immediately.

Think of it like:

```javascript
myFunction();
```

Not:

```javascript
setTimeout(myFunction, 0);
```

Huge difference.

---

# Listener Order

Question:

```javascript
emitter.on("event", () => console.log("A"));

emitter.on("event", () => console.log("B"));

emitter.on("event", () => console.log("C"));

emitter.emit("event");
```

### Output

```text
A
B
C
```

Listeners always execute in **registration order**.

---

# Why Order Matters

Imagine:

```text
User Registered

↓

Save User

↓

Send Email

↓

Analytics
```

If analytics ran before saving the user, your data might be wrong.

Listener order can matter when listeners depend on earlier work, though in many designs it's better to keep listeners independent.

---

# Passing Arguments

```javascript
emitter.emit("login", "Prahans", 22);
```

Internally, imagine:

```javascript
listener("Prahans", 22);
```

Nothing special.

Just normal function arguments.

---

# What If Nobody Is Listening?

```javascript
emitter.emit("unknown");
```

Does Node crash?

**No.**

It simply finds no listeners and returns.

Think of it like announcing something in an empty room.

No one responds.

Nothing bad happens.

---

# What If One Listener Throws?

Example:

```javascript
emitter.on("login", () => {
  console.log("First");
});

emitter.on("login", () => {
  throw new Error("Oops");
});

emitter.on("login", () => {
  console.log("Third");
});

emitter.emit("login");
```

What happens?

Without handling the error, the thrown exception interrupts the current `emit()` call.

The third listener will **not** run.

If the error isn't caught anywhere, the Node.js process will terminate.

### Output

```text
First

Error: Oops
```

This is one reason proper error handling is so important.

---

# Special `"error"` Event

There is one exception.

If you do:

```javascript
emitter.emit("error", new Error("Database failed"));
```

and **no** `"error"` listener exists...

Node treats this as an unhandled error and the process will throw.

We'll dedicate the next lesson to why `"error"` is special and how to handle it correctly.

---

# Can Listeners Be Slow?

Yes.

```javascript
emitter.on("work", () => {
  // Imagine this takes 5 seconds
});
```

Then:

```javascript
emitter.emit("work");
```

`emit()` won't finish until that listener returns.

This is another consequence of synchronous execution.

---

# Real World Example

A user registers.

```text
Create User

↓

emit("userCreated")

↓

Email

↓

Analytics

↓

Reward Points

↓

Return from emit()
```

Only after all the listeners complete does execution continue after `emit()`.

---

# Common Misconception

People hear:

> Node.js is event-driven.

They assume:

> Every event is asynchronous.

**Not true.**

Node is event-driven because **things happen in response to events**, not because every event runs asynchronously.

The asynchronous part usually comes from operations like:

- File I/O
- Network requests
- Timers

For example:

```javascript
emitter.on("login", async () => {
  await saveToDatabase();
});
```

Here:

- `emit()` calls the async listener **synchronously**.
- The listener immediately returns a `Promise` when it reaches the first `await`.
- `emit()` does **not** wait for that `Promise` to resolve.

This distinction is important and often misunderstood.

---

# Mental Model

Imagine a teacher taking attendance.

```text
Teacher says:

"Roll Number 1"

↓

Student 1 answers

↓

Teacher says:

"Roll Number 2"

↓

Student 2 answers

↓

Teacher says:

"Roll Number 3"

↓

Done
```

The teacher doesn't shout all names at once.

They call them one by one.

That's how `emit()` works.

---

# Exercises

## Exercise 1

Predict the output.

```javascript
emitter.on("hello", () => console.log("A"));

console.log("1");

emitter.emit("hello");

console.log("2");
```

---

## Exercise 2

Predict the output.

```javascript
emitter.on("test", () => console.log("First"));

emitter.on("test", () => console.log("Second"));

emitter.emit("test");
```

---

## Exercise 3

Predict the output.

```javascript
console.log("Before");

emitter.emit("nothing");

console.log("After");
```

---

## Exercise 4

Predict the output.

```javascript
emitter.on("user", (name) => {
  console.log(name);
});

emitter.emit("user", "Prahans");
```

---

## Exercise 5 (Important)

What happens?

```javascript
emitter.on("task", () => {
  console.log("A");
});

emitter.on("task", () => {
  throw new Error("Boom");
});

emitter.on("task", () => {
  console.log("C");
});

emitter.emit("task");
```

### Questions

- Will `C` print?
- Explain **why**.

---

# Challenge

Without running the code, explain in your own words:

1. Why is `emit()` considered synchronous?
2. Why do listeners execute in registration order?
3. Why is it dangerous for a listener to perform long, blocking work?
4. Why is the `"error"` event different from other events?

If you can answer those confidently, you've understood the **EventEmitter lifecycle** rather than just memorizing its API.

---

# Key Takeaways

By the end of this lesson, you should remember these ideas:

1. **`emit()` is synchronous.** It immediately calls every registered listener.
2. **Listeners execute in registration order**, one after another.
3. **`emit()` waits for each listener** to finish before returning.
4. **If no listeners exist**, `emit()` simply returns without error (except for the special `"error"` event).
5. **If a listener throws**, the current `emit()` call is interrupted unless the error is handled.
6. **Slow listeners block `emit()`**, because listeners run synchronously.
7. **Async listeners don't make `emit()` asynchronous**—they return a `Promise`, but `emit()` doesn't wait for it.

---

# Next Lesson Preview

In the next lesson, you'll learn about the **special `"error"` event**, including:

- Why `"error"` behaves differently
- How unhandled `"error"` events can crash your application
- Best practices for handling errors with `EventEmitter`
- Real-world error handling patterns used in Node.js applications
