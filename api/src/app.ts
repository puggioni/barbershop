import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);
app.use(cors());

app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});

export default app;
