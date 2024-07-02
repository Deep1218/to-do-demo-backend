import { Routes } from "../../helpers/config/constants";
import { Validator } from "../../validate";
import * as express from "express";
import { Middleware } from "../../middleware";
import { TaskController } from "./task.controller";
import { CreateTaskModel, UpdateTaskModel } from "./task.model";
import { TaskMiddleware } from "./task.middleware";

const v = new Validator();
const router = express.Router();
const taskController = new TaskController();
const taskMiddlleware = new TaskMiddleware();
const globalMiddleware = new Middleware();

router.post(
  "/",
  v.validate(CreateTaskModel),
  globalMiddleware.verifyUser,
  taskController.createTask
);

router.get("/", globalMiddleware.verifyUser, taskController.getAllTasks);
router.get("/:id", globalMiddleware.verifyUser, taskController.getTaskById);

router.put(
  "/:id",
  v.validate(UpdateTaskModel),
  globalMiddleware.verifyUser,
  taskController.updateTask
);

router.delete(
  "/:id",
  globalMiddleware.verifyUser,
  taskMiddlleware.taskExists,
  taskController.deleteTask
);

export const TaskRoute = router;
