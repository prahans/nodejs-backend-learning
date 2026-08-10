import os from "node:os";

console.log("===== OS MODULE =====\n");

// Operating System
console.log("Platform:", os.platform());
console.log("OS Type:", os.type());
console.log("Release:", os.release());
console.log("Version:", os.version());

// CPU Information
console.log("\n===== CPU =====");
console.log("Architecture:", os.arch());
console.log("Number of CPUs:", os.cpus().length);
console.log("CPU Details:", os.cpus());

// Memory Information
console.log("\n===== MEMORY =====");
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log(
  "Total Memory (GB):",
  (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
);
console.log(
  "Free Memory (GB):",
  (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
);

// User Information
console.log("\n===== USER =====");
console.log("User Info:", os.userInfo());
console.log("Home Directory:", os.homedir());
console.log("Hostname:", os.hostname());

// System Uptime
console.log("\n===== UPTIME =====");
console.log("System Uptime (seconds):", os.uptime());
console.log("System Uptime (hours):", (os.uptime() / 3600).toFixed(2));

// Network
console.log("\n===== NETWORK =====");
console.log("Network Interfaces:", os.networkInterfaces());

// Temporary Directory
console.log("\n===== TEMP DIRECTORY =====");
console.log("Temp Directory:", os.tmpdir());

// End Of Line
console.log("\n===== END OF LINE =====");
console.log(JSON.stringify(os.EOL));

// Constants
console.log("\n===== CONSTANTS =====");
console.log(os.constants);

// Machine Information
console.log("\n===== MACHINE =====");
console.log("Machine:", os.machine());

// Load Average (Linux/macOS only)
console.log("\n===== LOAD AVERAGE =====");
console.log(os.loadavg());

// Process Priority
console.log("\n===== PRIORITY =====");
console.log("Current Priority:", os.getPriority());
