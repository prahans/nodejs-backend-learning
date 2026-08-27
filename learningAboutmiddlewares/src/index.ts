import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";

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

// app.use("/random", (req, res, next) => {
//   console.log("i am only for random.");
//   next();
// });

// app.use((req, res, next) => {
//   const time = new Date(Date.now()).toString();
//   console.log(req.method, req.path, req.hostname, time);
//   next();
// });

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;
  if (token === "giveaccess") {
    return next();
  }
  res.send("ACCESS DENIED!");
};

app.get("/api", checkToken, (req: Request, res: Response) => {
  res.send("data");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hi, i am root");
});

app.get("/getcookies", (req: Request, res: Response) => {
  res.cookie("greet", "hello");
  res.cookie("country", "nepal");
  res.send("send you some cookies!!");
});

app.get("/random", (req: Request, res: Response) => {
  res.send("Hi, i am random page");
});

app.use((req, res) => {
  res.status(404).send("page not found");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
