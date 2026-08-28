import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    count: number;
  }
}

const app: Express = express();
const port = 3000;

const secret = "mySuperSecretString";

app.use(session({ secret: secret, resave: false, saveUninitialized: true }));

app.get("/reqcount", (req: Request, res: Response) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`you send a request ${req.session.count} times`);
});

app.get("/test", (req: Request, res: Response) => {
  res.send("test successful !");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
