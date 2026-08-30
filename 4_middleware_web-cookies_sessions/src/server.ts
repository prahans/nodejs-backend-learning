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
  for (let user of users) {
    if (user.username === username && user.password === password)
      req.session.login = true;
    req.session.userId = users.find((user) => user.username === username)?.id;
    return res.redirect("/profile");
  }
  res.send("plz enter the correct username and password");
});

app.get("/profile", (req: Request, res: Response) => {
  console.log(req.session.login); // why this is undefine at the beginning
  const username = users.find(
    (user) => user.id === req.session.userId,
  )?.username;
  if (req.session.login) {
    return res.send(`welcome, ${username}`);
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
