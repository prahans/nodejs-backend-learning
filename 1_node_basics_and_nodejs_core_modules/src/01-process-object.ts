import process from "node:process";

// env variables
// command line arguments
// exit code
// process lifecycle events
// read backend port from env file
// read secrets - db.urls, api keys, password, google auth secret
// process.env

// dotenv
// const nodeEnv = process.env.NODE_ENV ?? "development";

// process.env values are always string or undefined

// const port = Number(process.env.PORT ?? 3000);

// process.argv ->
// [
//     "/path/to/node",
//     "src/01-process-object.ts",
//     "start"
// ];

// const command = process.argv[2] ?? "start";
// fail flag
// crash flag

// const shouldFail = process.argv.includes("--fail");
// const shouldCrash = process.argv.includes("--crash");

// do not start async here
// node is already shutting down
// final log, final cleanup

// process.on("exit", (code) => {
//   console.log(`Process finished with exist code ${code}`);
// });

// function runApp(): void {
//   console.log({
//     command,
//   });

//   if (shouldFail) {
//     console.error("Manual failure trigered with -fail flag");
//     process.exit(1);
//   }

//   if (shouldCrash) {
//     console.error("Manual crash trigered with -crash flag");
//     process.exit(1);
//   }
// }

// runApp();

// Experiment 1 :
// console.log("process.pid : ", process.pid ) // Does the PID stay the same? -> No

// Experiment 2 :
// console.log("process.cwd : ", process.cwd()); // Run it from different folders and Observe: Does it change? -> Yes

// Experiment 3 :
// console.log(process.argv); // npm run 01 apple banana orange and ovserve the output
// console.log(process.argv.length);
// for (let i = 2; i < process.argv.length; i++) {
//   console.log(`i like to eat ${process.argv[i]}`);
// }

// Experiment 4 :
// console.log(process.memoryUsage());
// let test1 = process.memoryUsage();
// const arr = [];

// for (let i = 0; i < 5_000_000; i++) {
//   arr.push(i);
// }

// let test2 = process.memoryUsage();
// console.log(process.memoryUsage());
// console.log(test1.rss < test2.rss);
// console.log(test1.heapTotal < test2.heapTotal);
// console.log(test1.heapUsed < test2.heapUsed);
// console.log(test1.external < test2.external);
// console.log(test1.arrayBuffers < test2.arrayBuffers);

// Question: Which values increased?
// -> rss, heapTotal, heapUsed increased

// Experiment 5 :
// console.log(process.env); // Notice how many environment variables are already available on your system. -> thats alot

// Practice Exercises
// Exercise 1 (Easy)
// Print

// Node version
// console.log(process.versions.node); // 24.19.0
// console.log(process.version); // v24.19.0

// Current directory
// console.log("CWD : ", process.cwd()); // CWD :  D:\Web Development\nodejs-backend-learning\1_node_basics_and_nodejs_core_modules
// console.log("Dirname: ", __dirname); // Dirname:  D:\Web Development\nodejs-backend-learning\1_node_basics_and_nodejs_core_modules\src

// Platform
// import os from "os";
// console.log(process.platform);
// Expected Output Values
// The output will match one of these specific, lowercase strings depending on your operating system:

// Operating System    process.platform Output
// Windows             'win32' (even on 64-bit Windows)
// macOS               'darwin'
// Linux               'linux'
// Android             'android'
// FreeBSD             'freebsd'

// console.log(os.platform()); // Same as process.platform (e.g., 'darwin')
// console.log(os.type()); // Returns OS type (e.g., 'Windows_NT', 'Linux', 'Darwin')
// console.log(os.arch()); // Returns CPU architecture (e.g., 'x64', 'arm64')

// Exercise 2 (Easy)

// Accept your name from the command line.
// console.log(`hello ${process.argv[2]}`); //  npm run 01 prahans ->  hello prahans

// Exercise 3 (Medium)
// Accept two numbers from the command line.
// console.log(typeof process.argv[2]);
// const sum = Number(process.argv[2]) + Number(process.argv[3]); // npm run 01 15 30 -> 45
// console.log(sum);

// Exercise 4 (Medium)
// If no name is provided, and exit with process.exit(1);

// if (!process.argv[2]) {
//   process.on("exit", (code) => {
//     console.log(`Process finished with exist code ${code}`);
//   });
// }

// if (!process.argv[2]) {
//   console.error("you didn't pass your name");
//   process.exit(1);
// }

// console.log("hello", process.argv[2]);

// Exercise 5 (Hard)
// Build a tiny calculator. -> node app.js add 10 20 output : 30 | node app.js subtract 50 20 output : 30
// if (process.argv[2] === "add") {
//   const result = Number(process.argv[3]) + Number(process.argv[4]);
//   console.log(result);
// }

// if (process.argv[2] === "subtract") {
//   const result = Number(process.argv[3]) - Number(process.argv[4]);
//   console.log(result);
// }

// Mini Project

// Create a simple CLI greeting app:

const makeUppercase = process.argv.includes("--uppercase");

const argumentsOnly = process.argv
  .slice(2)
  .filter((arg) => arg !== "--uppercase");

const name = argumentsOnly[0];

if (name) {
  let greet = `Hello ${process.argv[2]} 👋`;
  let message = "Today is a great day to learn Node.js.";

  if (makeUppercase) {
    greet = greet.toUpperCase();
    message = message.toUpperCase();
  }

  console.log(greet);
  console.log(message);
} else {
  console.log("Please provide a name!");
}
