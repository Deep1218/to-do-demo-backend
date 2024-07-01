import * as express from "express";
import { UserRoute } from "./module/user/user.route";
import { TaskRoute } from "./module/task/task.route";
import { ResponseCode } from "./helpers/config/constants";
import { ResponseBuilder } from "./helpers/responseBuilder";
export class Routes {
  protected basePath: any;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public path() {
    const router = express.Router();
    router.use("/user", UserRoute);
    router.use("/task", TaskRoute);
    router.get("/health-check", (req, res) => {
      return res.status(ResponseCode.SUCCESS_CODE).json({ success: true });
    });
    router.all("/*", (req, res) => {
      const response = ResponseBuilder.notFound("URL not found!");
      return res.status(response.code).json(response);
    });
    return router;
  }
}
