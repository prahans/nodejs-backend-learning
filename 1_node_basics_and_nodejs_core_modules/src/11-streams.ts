// piece by piece
// not loading the data everything at once
// read large files
// upload files
// downloading files
// video/audio processing
// compression

// CHUNKS

// here is my full 500mb file
// here is chunk 1
// here is chunk 2
// here is chunk 3
// here is chunk 4
// here is chunk 5

// memory efficient
// streams types
// readable stream - source of data
// writable stream - destination where the data is written
// transform stream - read the data, change it and pass that forward

import path from "node:path";
import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const readableStream = Readable.from(["Hello", "from", "nodejs", "streams"]);

const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    callback(null, text.toUpperCase());
  },
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("chunk received", chunk.toString());
    callback();
  },
});

async function main() {
  try {
    await pipeline(readableStream, uppercaseTransform, writableStream);
    console.log("steam completed");
  } catch (error) {
    const msg = error instanceof Error ? error.message : "unknown error";
    console.log("steam failed", msg);
  }
}

// main();

import fsPromises from "node:fs/promises";
import fs from "node:fs";
const FILE_PATH = path.join(process.cwd(), "file", "story.txt");

async function readFile() {
  try {
    const data = await fsPromises.readFile(FILE_PATH, "utf-8");
    console.log(data);
    const stream = fs.createReadStream(FILE_PATH, "utf-8");

    stream.on("data", (chunk) => {
      console.log("\n", chunk);
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "unknown error";
    console.log("error : ", msg);
  }
}

// readFile();

const stream = fs.createReadStream(FILE_PATH);

stream.on("data", (chunk) => {
  console.log("DATA:", chunk.length);
});

stream.on("end", () => {
  console.log("DONE");
});
