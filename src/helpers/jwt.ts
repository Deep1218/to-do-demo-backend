import { Config } from "./config/constants";
import * as jwt from "jsonwebtoken";

export class JWT {
  public static generateToken(data: any) {
    const payload = {
      sub: data,
    };
    const token = jwt.sign(payload, Config.JWT_SECRET, { expiresIn: "24h" });
    // TODO logic to save token to db
    return token;
  }
  public static verifyToken(token: string) {
    try {
      return jwt.verify(token, Config.JWT_SECRET);
    } catch (error) {
      return false;
    }
  }
}
