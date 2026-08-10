# Node.js `os` Module Cheat Sheet

## Most Important Methods

| Method                   | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| `os.platform()`          | Current platform (`win32`, `linux`, `darwin`) |
| `os.arch()`              | CPU architecture (`x64`, `arm64`)             |
| `os.cpus()`              | CPU information                               |
| `os.totalmem()`          | Total RAM                                     |
| `os.freemem()`           | Free RAM                                      |
| `os.hostname()`          | Computer name                                 |
| `os.userInfo()`          | Current user information                      |
| `os.homedir()`           | User's home directory                         |
| `os.tmpdir()`            | Temporary folder                              |
| `os.uptime()`            | System uptime                                 |
| `os.networkInterfaces()` | Network details                               |
| `os.type()`              | Operating system type                         |
| `os.release()`           | OS release version                            |
| `os.version()`           | Detailed OS version                           |
| `os.machine()`           | Machine hardware type                         |
| `os.loadavg()`           | CPU load average (Linux/macOS only)           |
| `os.getPriority()`       | Process scheduling priority                   |

---

## Most Useful Methods for Backend Development

When building **Express.js APIs**, **Node.js servers**, or other backend applications, you'll most commonly use:

- `os.platform()` – Get the operating system (`win32`, `linux`, `darwin`).
- `os.arch()` – Get the CPU architecture (`x64`, `arm64`, etc.).
- `os.hostname()` – Get the computer's hostname.
- `os.userInfo()` – Get information about the current user.
- `os.homedir()` – Get the current user's home directory.
- `os.totalmem()` – Get the total amount of system memory (RAM).
- `os.freemem()` – Get the available/free system memory.

---

## When Are the Other Methods Used?

The remaining methods are mostly useful for:

- 🖥️ System monitoring
- 📊 Performance dashboards
- 🔍 Diagnostics and debugging
- ☁️ DevOps tools
- 📈 Server health checks
- 🛠️ Building CLI utilities

They are less common in everyday Express.js CRUD applications but are valuable when working with server infrastructure or monitoring tools.
