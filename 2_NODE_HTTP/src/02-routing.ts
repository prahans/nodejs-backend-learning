import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    // http: /localhost:8000/users -> req.url: /users
    // http: /localhost:8000/users?id=1 -> req.url: /users?id=1

    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("content-Type", "text/plain");
    if (method === "GET" && pathName === "/health") {
      res.statusCode == 200;
      res.end("server is healthy");
      return;
    }

    if (method === "GET" && pathName === "/users") {
      res.statusCode == 200;
      res.end("list of users");
      return;
    }

    if (method === "POST" && pathName === "/users") {
      res.statusCode == 201;
      res.end("users created successfully !!");
      return;
    }

    res.statusCode = 404; // 404 not found
    res.end("route not found");
  },
);

server.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
