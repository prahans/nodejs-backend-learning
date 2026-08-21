import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/app", (req: Request, res: Response) => {
  res.send("welcome to the app");
});

app.post("/", (req: Request, res: Response) => {
  res.send("this is post request");
});

app.put("/", (req: Request, res: Response) => {
  res.send("this is put request");
});

app.patch("/", (req: Request, res: Response) => {
  res.send("this is patch request");
});

app.delete("/", (req: Request, res: Response) => {
  res.send("this is delete request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
