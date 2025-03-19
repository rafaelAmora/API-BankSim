import Express from "express";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

const app = Express();

app.use(Express.json());
app.use(routes);
const PORT = 3333;

app.use(errorHandling);
app.listen(PORT || 3333, () => {
  console.log("run server in port :" + PORT);
});
