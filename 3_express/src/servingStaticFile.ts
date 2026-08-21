import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
