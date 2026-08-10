import crypto from "node:crypto";

// build in node js module
// security related tasks
// creating random UUID, IDs
// creating secure token
// hashing data
// to verify of the data was not changed
// encrypt / decrypt

// crypto.randomUUID -> UUID stands for Universally Unique Identifier | it can be used for user id, order id, session id

// const requestId = crypto.randomUUID();
// console.log("requestId : ", requestId);

// crypto.randomBytes
// password reset token
// email verification
// session secret, api keys

// 32 char string
// const restToken = crypto.randomBytes(16).toString("hex");
// console.log("resetToken : ", restToken);

// No, you cannot convert a hash back into the original text. Hashing is a one-way mathematical process. It scrambles your text into a fixed code, but it throws away information so the step cannot go backward
// const text = "hello node";
// const hash = crypto.createHash("sha256").update(text).digest("hex");
// console.log("hash : ", hash);

// crypto.createHmac

// normal hash : data -> hash
// Hmac : data + secret -> signed hash
// webhook
// signed tokens

// const secret = "my-super-secret-key";
// const message = "user_id=1";
// const signature = crypto
//   .createHmac("sha256", secret)
//   .update(message)
//   .digest("hex");

// console.log("signature : ", signature);

// const signatureVerify = crypto
//   .createHmac("sha256", secret)
//   .update(message)
//   .digest("hex");

// console.log(
//   "signature is valid and matching : ",
//   signature === signatureVerify,
// ); // true

// Experiment 1

// Observe:

// Are any values repeated? -> No
// How long is each string? ->  (8 * 2) -> 16

// for (let i = 0; i < 5; i++) {
//   console.log(crypto.randomBytes(8).toString("hex"));
// }

// Experiment 2
// console.log(crypto.randomBytes(4).toString("hex").length); // 4 * 2 -> 8
// console.log(crypto.randomBytes(8).toString("hex").length); // 8 * 2 -> 16
// console.log(crypto.randomBytes(32).toString("hex").length); // 32 * 2 -> 64

// function generateToken(length: number): string {
//   return crypto.randomBytes(length).toString("hex");
// }

// console.log(generateToken(16));

// HASH

// Experiment 1
// Hash the same string twice.
function hash(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

console.log(hash("apple"));
console.log(hash("apple"));
