import { Response } from "express";
import { TaskUtils } from "./task.utils";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { ResponseMessage } from "../../helpers/config/constants";

export class TaskMiddleware {
  private taskUtils = new TaskUtils();
  public taskExists = async (req: any, res: Response, next: any) => {
    try {
      const userId = req._user._id;
      const taskId = req.params.id;
      const taskData = await this.taskUtils.getTaskById(taskId, userId);
      if (!taskData.data) {
        const response = ResponseBuilder.badRequest(
          ResponseMessage.TASK_NOT_FOUND
        );
        return res.status(response.code).json(response);
      }
      next();
    } catch (error) {
      const response = ResponseBuilder.badRequest(
        ResponseMessage.TASK_NOT_FOUND
      );
      return res.status(response.code).json(response);
    }
  };
}
