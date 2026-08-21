import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const PORT = 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("app is listening on port 3000");
});
