import { UserUtils } from "./user.utils";
import { Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class UserMiddleware {
  private userUtils = new UserUtils();

  public getUser = async (req: any, res: Response, next: any) => {
    try {
      const { email } = req.body;
      const response: any = await this.userUtils.logIn(email);

      if (response.code == 200) {
        req._user = response.data._doc;
        next();
      } else {
        return res.status(response.code).json(response);
      }
    } catch (error) {
      console.error(error);
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };
}
