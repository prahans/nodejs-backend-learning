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

function ensureDemoFolderExists(): void {
  if (!fs.existsSync(DEMO_FOLDER_PATH)) {
    fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });
  }
}

function runSyncExample(): FileResult {
  // write content to a file
  fs.writeFileSync(SYNC_FILE_PATH, "created using fs sync", "utf-8");
  fs.appendFileSync(SYNC_FILE_PATH, " append using fs sync", "utf-8");
  const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");
  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    style: "sync",
    content,
    fileName: path.basename(SYNC_FILE_PATH),
    sizeInBytes: stats.size,
  };
}

async function main() {
  try {
    ensureDemoFolderExists();
    const syncResult = runSyncExample();
    console.log([syncResult]);
  } catch (error) {
    if (error instanceof Error) {
      console.error("file system error : ", error.message);
    }
  }
}

main();
