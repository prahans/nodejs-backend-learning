// buffers - raw binary data
// binary data means - when u have ur data stored in bytes
// reading files
// receiving http req bodies
// working with streams
// handling images, pdf files, videos
// encrypt and hashing
// string - human readable text
// buffer - raw bytes

const textBuffer = Buffer.from("Node");
console.log(textBuffer); // <Buffer 4e 6f 64 65>
console.log(textBuffer.toString("utf-8")); // Node

const engBuffer = Buffer.from("Hello");
console.log(engBuffer.length); // 5

const fixedBuffer = Buffer.alloc(5);
console.log(fixedBuffer); // <Buffer 00 00 00 00 00>
fixedBuffer.write("api");
console.log(fixedBuffer); // <Buffer 61 70 69 00 00>
console.log(fixedBuffer.toString("utf-8")); // api
