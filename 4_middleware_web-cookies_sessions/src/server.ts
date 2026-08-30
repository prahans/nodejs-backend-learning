import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import session from "express-session";

type User = {
  id: number;
  username: string;
  password: string;
};

declare module "express-session" {
  interface SessionData {
    count: number;
    name: string;
    login: boolean;
    userId: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const users: User[] = [
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

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  next();
};

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid username or password");
  }
  req.session.userId = user.id;
  res.redirect("/profile");
});

app.get("/profile", requireAuth, (req: Request, res: Response) => {
  return res.send(`welcome, ${req.user?.username}`);
});

app.get("/register", requireAuth, (req: Request, res: Response) => {
  const { name = "anonymous" } = req.query;
  console.log(req.session);
  req.session.name = name.toString();
  res.redirect("/hello");
});

app.get("/hello", requireAuth, (req: Request, res: Response) => {
  res.send(`Hello, ${req.user?.username}`);
});

app.get("/reqcount", requireAuth, (req: Request, res: Response) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`you send a request ${req.session.count} times`);
});

app.get("/test", requireAuth, (req: Request, res: Response) => {
  res.send("test successful !");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
