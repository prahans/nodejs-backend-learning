import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import session from "express-session";

const app: Express = express();
const port = 3000;

const secret = "mySuperSecretString";

app.use(session({ secret: secret }));

app.get("/test", (req: Request, res: Response) => {
  res.send("test successful !");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
