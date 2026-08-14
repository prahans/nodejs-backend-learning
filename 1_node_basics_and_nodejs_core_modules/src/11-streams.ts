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
// writeable stream - destination where the data is written
// transform stream - read the data, change it and pass that forward

import { Readable } from "node:stream";

const readableStream = Readable.from(["Hello", "from", "nodejs", "streams"]);
