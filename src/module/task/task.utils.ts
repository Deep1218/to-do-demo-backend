import { ResponseBuilder } from "../../helpers/responseBuilder";
import { TaskModel } from "../../schemas/task";
export class TaskUtils {
  public getAllByUser = async (userId: string) => {
    try {
      const tasks = await TaskModel.find({ userId });
      return ResponseBuilder.data(tasks);
    } catch (error) {
      return ResponseBuilder.errorMessage();
    }
  };

  public getTaskById = async (id: string, userId: string) => {
    try {
      const task = await TaskModel.findOne({ _id: id, userId });
      return ResponseBuilder.data(task);
    } catch (error) {
      return ResponseBuilder.errorMessage();
    }
  };

  public deleteTaskById = async (id: string, userId: string) => {
    try {
      const task = await TaskModel.findOneAndDelete({ _id: id, userId });
      return ResponseBuilder.data(task);
    } catch (error) {
      return ResponseBuilder.errorMessage();
    }
  };

  public updateTaskById = async (
    id: string,
    userId: string,
    updateData: any
  ) => {
    try {
      const task = await TaskModel.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true }
      );
      return ResponseBuilder.data(task);
    } catch (error) {
      return ResponseBuilder.errorMessage();
    }
  };
  public createTask = async (data: any) => {
    try {
      const newTask = new TaskModel(data);
      const savedTask = await newTask.save();
      return ResponseBuilder.data(savedTask);
    } catch (error) {
      return ResponseBuilder.errorMessage();
    }
  };
}
