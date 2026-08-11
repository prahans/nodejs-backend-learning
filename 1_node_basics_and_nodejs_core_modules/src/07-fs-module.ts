import path from "node:path";
import fs from "node:fs";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync_note.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

// fs - file system
// create folders
// writte files
// read files
// check file information
// delete files

// sync apis : fs.readfilesync
// callback apis
// promise apis

// small startup scripts
// build scripts
// local demos

// not good or even bad practice
// http req handlers
// high traffic apis
// background jobs

function runSyncExample(): FileResult {
  // write content to a file
  fs.writeFileSync(SYNC_FILE_PATH, "created using fs sync", "utf-8");
}
