import { Routes } from "../../helpers/config/constants";
import { Validator } from "../../validate";
import { UserController } from "./user.controller";
import * as express from "express";
import { SigninModel, SignupModel } from "./user.model";
import { UserMiddleware } from "./user.middleware";
import { Middleware } from "../../middleware";

const v = new Validator();
const router = express.Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
const globalMiddleware = new Middleware();

router.post(
  Routes.AUTH.SIGN_UP,
  v.validate(SignupModel),
  userController.signUp
);

router.post(
  Routes.AUTH.SIGN_IN,
  v.validate(SigninModel),
  userMiddleware.getUser,
  userController.logIn
);

router.patch(
  Routes.USER.LOGOUT,
  globalMiddleware.verifyUser,
  userController.logout
);

router.delete(
  Routes.USER.DELETE,
  globalMiddleware.verifyUser,
  userController.deleteMyAccount
);

export const UserRoute = router;
