import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

app.use((req, res) => {
  const { query } = req.query;
  console.log(query);
  console.log("hi i am middleware");
  res.send("middleware finished");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hi, i am root");
});

app.get("/random", (req: Request, res: Response) => {
  res.send("Hi, i am random page");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
