import path from "node:path";
import fs, { stat } from "node:fs";
import fsPromises from "node:fs/promises";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync_note.txt");
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback-note.txt");
const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise_note.txt");

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

function runCallbackExample(): Promise<FileResult> {
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      CALLBACK_FILE_PATH,
      "create using callback fs",
      "utf-8",
      (writeError) => {
        if (writeError) {
          rejects(writeError);
          return;
        }
        fs.appendFile(
          CALLBACK_FILE_PATH,
          " append using callback fs",
          "utf-8",
          (appendError) => {
            if (appendError) {
              rejects(appendError);
              return;
            }
            fs.readFile(CALLBACK_FILE_PATH, "utf-8", (readError, content) => {
              if (readError) {
                rejects(readError);
                return;
              }

              fs.stat(CALLBACK_FILE_PATH, (statError, stats) => {
                if (statError) {
                  rejects(statError);
                  return;
                }

                resolve({
                  style: "callback",
                  content,
                  sizeInBytes: stats.size,
                  fileName: path.basename(CALLBACK_FILE_PATH),
                });
              });
            });
          },
        );
      },
    );
  });
}

// promise api

// async function runPromiseExample(): Promise<FileResult> {
//   await fsPromises.writeFile(
//     PROMISE_FILE_PATH,
//     "created using promise api",
//     "utf-8",
//   );

//   await fsPromises.appendFile(
//     PROMISE_FILE_PATH,
//     " appended using promise api",
//     "utf-8",
//   );

//   const content = await fsPromises.readFile(PROMISE_FILE_PATH, "utf-8");
//   const stats = await fsPromises.stat(PROMISE_FILE_PATH);

//   return {
//     style: "promise",
//     content,
//     fileName: path.basename(PROMISE_FILE_PATH),
//     sizeInBytes: stats.size,
//   };
// }

// async function main() {
//   try {
//     ensureDemoFolderExists();
//     const syncResult = runSyncExample();
//     const callbackResult = await runCallbackExample();
//     const promiseResult = await runPromiseExample();
//     console.log([syncResult, callbackResult, promiseResult]);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("file system error : ", error.message);
//     }
//   }
// }

// main();

// console.log(path.join(process.cwd(), "node/note", "note-app"));
const NEW_FOLDER_PATH = path.join(process.cwd(), "AboutMe");
const FILE_PATH = path.join(NEW_FOLDER_PATH, "demo.txt");
const NEW_FILE_PATH = path.join(NEW_FOLDER_PATH, "prahans.txt");

type FileType = {
  content: string;
  fileName: string;
  sizeInByte: number;
};

async function readThefile() {
  const data = await fsPromises.readFile(FILE_PATH, "utf-8");
  return data;
}

async function writeTheFile() {
  await fsPromises.mkdir("AboutMe", {
    recursive: true,
  });

  await fsPromises.writeFile(FILE_PATH, "this is demo file", "utf-8");
}

async function appendTheFile() {
  await fsPromises.appendFile(
    FILE_PATH,
    " | i am a fullstack developer.",
    "utf-8",
  );
}

async function renameFile() {
  await fsPromises.rename(FILE_PATH, NEW_FILE_PATH);
}

async function copyFile() {
  const srcPath = path.join(process.cwd(), "docs", "node_os_guide.md");
  const destDir = path.join(process.cwd(), "AboutMe");
  const destPath = path.join(destDir, "copied_data.md");
  await fsPromises.copyFile(srcPath, destPath);
}

async function deleteFile() {
  const dir = path.join(process.cwd(), "AboutMe");
  const filePath = path.join(dir, "copied_data2.txt");
  await fsPromises.unlink(filePath);
}

async function deleteFolder() {
  const dir = path.join(process.cwd(), "file-system");
  await fsPromises.rm(dir, { recursive: true, force: true });
}

const targetDir = path.join(process.cwd(), "AboutMe");

async function listAndDeleteFolder(targetDir: string) {
  // 1. List all items inside the folder (including nested ones)
  console.log(`--- Files inside "${path.basename(targetDir)}": ---`);
  listFilesRecursively(targetDir);

  // 2. Forcefully delete the folder and everything inside it
  await fsPromises.rm(targetDir, { recursive: true, force: true });
  console.log(`\nSuccessfully deleted folder: ${targetDir}`);
}

async function listFilesRecursively(dir: string) {
  const items = await fsPromises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      listFilesRecursively(fullPath);
    } else {
      console.log(item.name);
    }
  }
}

async function main() {
  try {
    await listAndDeleteFolder(targetDir);
  } catch (error) {
    if (error instanceof Error) {
      console.error("file system error : ", error.message);
    }
  }
}

main();
