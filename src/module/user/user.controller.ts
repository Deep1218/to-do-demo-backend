import { Config, ResponseMessage } from "../../helpers/config/constants";
import { UserUtils } from "./user.utils";

import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { JWT } from "../../helpers/jwt";

export class UserController {
  public userUtils = new UserUtils();

  public signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, Number(Config.SALT_ROUND));
      const userDetails = {
        name,
        email,
        password: hash,
      };
      const result: any = await this.userUtils.signUp(userDetails);

      return res.status(result.code).json(result);
    } catch (error) {
      console.log(error);
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };

  public logIn = async (req: any, res: Response) => {
    try {
      const { password } = req.body;
      const { password: actuallPassword, ...user } = req._user;

      const isMatched = await bcrypt.compare(password, actuallPassword);

      if (isMatched) {
        const token = JWT.generateToken({ _id: user._id, email: user.email });
        const response = ResponseBuilder.data({ token, ...user });
        return res.status(response.code).json(response);
      }

      const response = ResponseBuilder.badRequest(
        ResponseMessage.SIGNIN_FAILED
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.error(error);
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };

  public deleteMyAccount = async (req: any, res: Response) => {
    try {
      const { _id } = req._user;
      this.userUtils.updateUserById(_id);
      const response = ResponseBuilder.successMessage(
        ResponseMessage.ACCOUNT_DELETED
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.error(error);
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };
}
