import { Response } from "express";
import { TaskUtils } from "./task.utils";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { ResponseMessage } from "../../helpers/config/constants";

export class TaskController {
  private taskUtils = new TaskUtils();

  public getAllTasks = async (req: any, res: Response) => {
    try {
      const userId = req._user._id;
      const tasksData = await this.taskUtils.getAllByUser(userId);

      if (tasksData.code == 200 && tasksData.data)
        return res.status(tasksData.code).json(tasksData);

      const response = ResponseBuilder.badRequest(
        ResponseMessage.TASKS_NOT_FOUND
      );
      return res.status(response.code).json(response);
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };

  public getTaskById = async (req: any, res: Response) => {
    try {
      const userId = req._user._id;
      const taskId = req.params.id;
      const taskData = await this.taskUtils.getTaskById(taskId, userId);
      if (taskData.code == 200 || taskData.data)
        return res.status(taskData.code).json(taskData);
      const response = ResponseBuilder.badRequest(
        ResponseMessage.TASK_NOT_FOUND
      );
      res.status(response.code).json(response);
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };

  public deleteTask = async (req: any, res: Response) => {
    try {
      const userId = req._user._id;
      const taskId = req.params.id;
      this.taskUtils.deleteTaskById(taskId, userId);
      const response = ResponseBuilder.successMessage(
        ResponseMessage.TASK_DELETED
      );
      res.status(response.code).json(response);
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };

  public updateTask = async (req: any, res: Response) => {
    try {
      const userId = req._user._id;
      const taskId = req.params.id;
      const updateData = req.body;
      const taskData = await this.taskUtils.updateTaskById(
        taskId,
        userId,
        updateData
      );
      if (taskData.code == 200 || taskData.data)
        return res.status(taskData.code).json(taskData);
      const response = ResponseBuilder.badRequest(
        ResponseMessage.TASK_NOT_FOUND
      );
      res.status(response.code).json(response);
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };
  createTask = async (req: any, res: Response) => {
    try {
      const userId = req._user._id;
      const { title, description, status, date } = req.body;
      const taskCreated = await this.taskUtils.createTask({
        userId,
        title,
        description,
        status,
        date,
      });
      if (taskCreated.code == 200 && taskCreated.data)
        return res.status(taskCreated.code).json(taskCreated);
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };
}
