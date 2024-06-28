import dotenv from "dotenv";

dotenv.config();

export class Constants {
  public static readonly TIMEZONE = "Asia/Kolkata";
  public static readonly CODE = "CODE";
  public static readonly APPROVED = "APPROVED";
  public static readonly IMAGE_MIMES = ["image/jpeg", "image/jpg", "image/png"];
  public static readonly IMAGE_TYPES = [".jpeg", ".jpg", ".png"];
  public static readonly UPLOAD_FOLDER = "uploads";
  public static readonly FILE_TYPES = {
    IMAGE: "img",
    DOCUMENT: "doc",
    VIDEO: "vid",
  };
  public static readonly THUMB_TYPES = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
  };
  public static readonly VIDEO_MIMES = ["video/mp4", "video/quicktime"];
  public static readonly IMAGE_TYPE_UNDEFINED = "GENERAL";
  public static readonly DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";
  public static readonly DATE_TIME_24Hours_FORMAT = "YYYY-MM-DD HH:mm:ss";
  public static readonly DATE_FORMAT = "YYYY-MM-DD";
  public static readonly RECORDS_PER_PAGE = 15;
  public static readonly PASSWORD_HASH = 12;
  public static readonly RANDOM_ID_COUNT = 3;
  public static readonly HEX = "hex";
  public static readonly MD5 = "md5";
}
export class Config {
  public static readonly API_KEY = process.env.ZERODHA_API_KEY;
  public static readonly API_SECRET = process.env.ZERODHA_API_SECRETE;
  public static readonly REDIRECT_URL = process.env.REDIRECT_URL;
  public static readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
  public static readonly SALT_ROUND = process.env.SALT_ROUND;
}

export class Routes {
  public static readonly AUTH = {
    SIGN_UP: "/sign_up",
    SIGN_IN: "/sign_in",
  };
  public static readonly USER = {
    DELETE: "/",
  };
}

export class ResponseMessage {
  public static readonly SUCCESS = "SUCCESS";
  public static readonly ERROR = "ERROR";
  public static readonly BAD_DATA = "BAD DATA";
  public static readonly BACKEND_API_FAILURE = "BACKEND API FAILURE";
  public static readonly INVALID_REQUEST = "INVALID REQUEST";
  public static readonly INTERNAL_SERVER_ERROR = "INTERNAL SERVER ERROR";
  public static readonly SIGNUP_SUCCESS = "User registered successfully";
  public static readonly SIGNUP_FAILED = "User registration failed";
  public static readonly SIGNIN_SUCCESS = "Login successfully";
  public static readonly SIGNIN_FAILED = "User not registered";
  public static readonly BCRYPT_FAILED = "Bcrypt error";
  public static readonly USER_NOT_FOUND = "User not found";
  public static readonly EMAIL_NOT_VERIFIED =
    "Email is not verified! Please verify your email";
  public static readonly PHONE_NOT_VERIFIED =
    "Phone number is not verified! Please verify your phone number";
  public static readonly UNAUTHORIZED = "You are unauthorized";
  public static readonly ACCOUNT_DELETED = "Your account has been deleted";
}
export class ResponseCode {
  public static readonly UNAUTHORIZED_CODE = 401;
  public static readonly NOT_FOUND_CODE = 404;
  public static readonly SUCCESS_CODE = 200;
  public static readonly INTERNAL_SERVER_ERROR_CODE = 500;
  public static readonly FAIL_CODE = 400;
  public static readonly FORBIDDEN_CODE = 403;
}
