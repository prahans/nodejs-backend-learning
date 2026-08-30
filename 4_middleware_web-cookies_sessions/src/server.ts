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
    name: string;
    login: boolean;
  }
}

const users = [
  {
    id: 1,
    username: "prahans",
    password: "123456",
  },
];

const app: Express = express();
const port = 3000;

const secret = "mySuperSecretString";

const sessionOption = {
  secret: secret,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(express.json());

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === users[0].username && password === users[0].password) {
    req.session.login = true;
    return res.redirect("/profile");
  }
  req.session.login = false;
  res.send("plz enter the correct username and password");
});

app.get("/profile", (req: Request, res: Response) => {
  console.log(req.session.login); // why this is undefine at the beginning
  if (req.session.login) {
    return res.send("Welcome Prahans");
  }
  return res.send("Unauthorized");
});

app.get("/register", (req: Request, res: Response) => {
  const { name = "anonymous" } = req.query;
  console.log(req.session);
  req.session.name = name.toString();
  res.redirect("/hello");
});

app.get("/hello", (req: Request, res: Response) => {
  res.send(`Hello, ${req.session.name}`);
});

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
