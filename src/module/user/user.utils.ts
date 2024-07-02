import { ObjectId } from "mongoose";
import { ResponseMessage } from "../../helpers/config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UserModel } from "../../schemas/user";
import { UserActivityModel } from "../../schemas/userActivity";

export class UserUtils {
  public async signUp(data: Record<string, any>): Promise<ResponseBuilder> {
    try {
      const newUser = new UserModel(data);
      const user = await newUser.save();

      if (user._id) {
        return ResponseBuilder.successMessage(ResponseMessage.SIGNUP_SUCCESS);
      } else {
        return ResponseBuilder.badRequest(ResponseMessage.SIGNUP_FAILED);
      }
    } catch (error) {
      console.error("Internal server error", error);
      return ResponseBuilder.errorMessage();
    }
  }

  public async logIn(email: string): Promise<ResponseBuilder> {
    try {
      const where: Record<string, any> = {
        email,
        isDeleted: false,
      };

      const userDetails = await UserModel.findOne(where).exec();

      if (!userDetails) {
        return ResponseBuilder.badRequest(ResponseMessage.SIGNIN_FAILED);
      }
      return ResponseBuilder.data(userDetails);
    } catch (error) {
      console.log("Internal server error", error);
      return ResponseBuilder.errorMessage();
    }
  }

  public async getUserById(id: string) {
    try {
      const user = await UserModel.findOne({
        _id: id,
        isDeleted: false,
      }).exec();
      return ResponseBuilder.data(user);
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }

  public async updateUserById(id: ObjectId) {
    try {
      const user = await UserModel.updateOne(
        { _id: id },
        {
          isDeleted: true,
        }
      ).exec();
      return ResponseBuilder.data(user);
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }
  public async saveActivity(data: Record<string, any>) {
    try {
      const newActivity = new UserActivityModel(data);
      const user = await newActivity.save();

      if (user._id) {
        return ResponseBuilder.successMessage();
      } else {
        return ResponseBuilder.badRequest(ResponseMessage.SIGNUP_FAILED);
      }
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }

  public async removeActivity(userId: string) {
    try {
      await UserActivityModel.deleteOne({ userId });
      return ResponseBuilder.successMessage();
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }
  public async getActivity(userId: string) {
    try {
      const activity = await UserActivityModel.findOne({ userId });
      return ResponseBuilder.data(activity);
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }
  public async getActivityByToken(token: string) {
    try {
      const activity = await UserActivityModel.findOne({ token });
      return ResponseBuilder.data(activity);
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }
  public async removeActivityByToken(token: string) {
    try {
      await UserActivityModel.deleteOne({ token });
      return ResponseBuilder.successMessage();
    } catch (error) {
      console.error(error);
      return ResponseBuilder.errorMessage();
    }
  }
}
