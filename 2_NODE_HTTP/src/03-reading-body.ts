import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

type CreateUserBody = {
  name?: string;
  email?: string;
};

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    // http: /localhost:8000/users -> req.url: /users
    // http: /localhost:8000/users?id=1 -> req.url: /users?id=1

    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("content-Type", "text/plain");

    if (method === "POST" && pathName === "/users") {
      const chunks: Buffer[] = [];
      // data event is going to run every time node receives a new body
      req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        try {
          const rawBody = Buffer.concat(chunks).toString("utf-8");

          if (!rawBody) {
            res.statusCode = 400;
            res.end("req body is required");
            return;
          }
          const body = JSON.parse(rawBody) as CreateUserBody;

          if (!body.name || !body.email) {
            res.statusCode = 400;
            res.end("both name and email is required");
            return;
          }

          res.statusCode = 200;
          res.end(`User create ${body.name} and ${body.email}`);
        } catch {
          res.statusCode = 400;
          res.end("invalid json body");
        }
      });
      res.on("error", () => {
        res.statusCode = 500;
        res.end("failed to read request body");
      });
      return;
    }

    res.statusCode = 404;
    res.end("route not found");
  },
);

server.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
