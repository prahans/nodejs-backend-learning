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
    userId: number;
  }
}

const users = [
  {
    id: 1,
    username: "prahans",
    password: "123456",
  },
  {
    id: 2,
    username: "anurag",
    password: "1234567",
  },
  {
    id: 3,
    username: "karuna",
    password: "12345678",
  },
  {
    id: 4,
    username: "pinki",
    password: "123456789",
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
  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid username or password");
  }
  req.session.userId = user.id;
  res.redirect("/profile");
});

app.get("/profile", (req: Request, res: Response) => {
  const user = users.find((user) => user.id === req.session.userId);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  return res.send(`welcome, ${user.username}`);
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
