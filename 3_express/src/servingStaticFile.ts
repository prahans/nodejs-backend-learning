import express, { type Express, type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app: Express = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const user = {
  name: "prahans",
  age: 22,
  city: "birgunj",
};

app.use(express.static(path.join(__dirname, "../public")));

app.get("/apple", (req: Request, res: Response) => {
  res.send("<h1>hello world</h1><h3>apple</h3>");
});

app.get("/user", (req: Request, res: Response) => {
  res.json(user);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
