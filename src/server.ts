import { Console } from "console";
import Express from "express";

const app = Express();

app.use(Express.json());

const PORT = 3333;

app.listen(PORT || 3333, () => {
  console.log("run server in port :" + PORT);
  console.log(process.env.DB_PASSWORD)
});
