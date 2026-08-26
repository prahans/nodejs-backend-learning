import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

// app.use((req, res, next) => {
//   console.log("Hi, i am 1st middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Hi, i am 2nd middleware");
//   next();
// });

app.use((req, res, next) => {
  const time = new Date(Date.now()).toString();
  console.log(req.method, req.path, req.hostname, time);
  next();
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
