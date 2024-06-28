import express, { Request, Response, Application } from "express";
import { db } from "./connection";
import { Routes } from "./routes";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
db();
const port = process.env.PORT;
export class App {
  protected app: Application;
  private logMode: string = "prod";
  constructor() {
    const NODE_ENV: any = process.env.NODE_ENV;
    this.app = express();
    if (NODE_ENV == "development") {
      this.logMode = "dev";
    }
    this.app.all("/*", (req: Request, res: Response, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT , DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.json(),
      (error: any, req: Request, res: Response, next: any) => {
        if (error) {
          return res.status(400).json({ error: "ERR_GENRIC_SYNTAX" });
        }
        next();
      }
    );
    this.app.use(morgan(this.logMode));
    this.app.use(express.json({ type: "application/vnd.api+json" }));
    const routes = new Routes(NODE_ENV);
    this.app.use("/", routes.path());
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
