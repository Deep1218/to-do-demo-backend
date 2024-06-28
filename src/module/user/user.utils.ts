import { ObjectId } from "mongoose";
import { ResponseMessage } from "../../helpers/config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UserModel } from "../../schemas/user";

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
}
