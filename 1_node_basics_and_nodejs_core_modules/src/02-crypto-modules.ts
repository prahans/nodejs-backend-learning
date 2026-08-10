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

// console.log(hash("apple")); // 3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b
// console.log(hash("apple")); // 3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b
// Question: Are they identical? -> Yes

// Experiment 2
// console.log(hash("apple")); // 3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b

// console.log(hash("Apple")); // f223faa96f22916294922b171a2696d868fd1f9129302eb41a45b2a2ea2ebbfd
// Question: How different are the outputs? -> very different

// Experiment 3
// console.log(hash("apple")); // 3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b

// console.log(hash(" apple")); // (with a trailing space) // 881cda2d83a43428d31e5f25126d200626f7fd2a877247d9359aed05a8d954a6
// Question: Can you spot why the hashes differ? -> Yes even space count

// Experiment 4
// Hash a long paragraph.
// Then change one punctuation mark.
// Observe how dramatically the hash changes.
// console.log(hash("hello world lets learn node js .")); // 97045097e892eb62ef5ba82784b467f047733b402c2daa145cbc4644f52c4e70

// console.log(hash("hello world lets learn node js ?")); // 9251208ecb40f733f4dc1a0fdc0c949bde5181073f82f4d7eed69bbf810e6fc5

console.log(hash(process.argv[2]));

const password = hash("helloWorld");

function compareHash(password: string, storededhash: string) {
  const hashValue = hash(password);
  return hashValue === storededhash;
}

console.log(compareHash(process.argv[2], password));
