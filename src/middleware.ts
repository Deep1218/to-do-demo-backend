import { Response } from "express";
import { JWT } from "./helpers/jwt";
import { UserUtils } from "./module/user/user.utils";
import { ResponseBuilder } from "./helpers/responseBuilder";

export class Middleware {
  private userUtils = new UserUtils();

  public verifyUser = async (req: any, res: Response, next: any) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const authToken = authorization.split(" ")[1];
        if (authToken) {
          const tokenPayload: any = JWT.verifyToken(authToken);
          const user = await this.userUtils.getUserById(tokenPayload.sub._id);
          if (user.code == 200) {
            const { password, ...userData } = user.data._doc;
            req._user = userData;
            next();
          } else {
            const response = ResponseBuilder.unauthorised();
            return res.status(response.code).json(response);
          }
        } else {
          const response = ResponseBuilder.unauthorised();
          return res.status(response.code).json(response);
        }
      } else {
        const response = ResponseBuilder.unauthorised();
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = ResponseBuilder.errorMessage();
      return res.status(response.code).json(response);
    }
  };
}
