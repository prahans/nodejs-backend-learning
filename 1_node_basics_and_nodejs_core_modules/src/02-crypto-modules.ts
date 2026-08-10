import crypto from "node:crypto";

// build in node js module
// security related tasks
// creating random UUID, IDs
// creating secure token
// hashing data
// to verify of the data was not changed
// encrypt / decrypt

// crypto.randomUUID -> UUID stands for Universally Unique Identifier | it can be used for user id, order id, session id

const requestId = crypto.randomUUID();
console.log("requestId : ", requestId);

// crypto.randomBytes
// password reset token
// email verification
// session secret, api keys

// 32 char string
const restToken = crypto.randomBytes(16).toString("hex");
console.log("resetToken : ", restToken);
