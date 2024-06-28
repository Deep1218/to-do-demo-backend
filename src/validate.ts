import { Response } from "express";
import { Model } from "./model";

export class Validator {
  public validate(arg: Model) {
    return function (req: any, res: Response, next: any) {
      Model.getModel(arg, req.body, req.query)
        .then((m2) => {
          req.model = m2;
          next();
        })
        .catch((err) => {
          const error = err.map(
            (error: any) => error.constraints[Object.keys(error.constraints)[0]]
          );
          return res.status(400).json({ error, code: 400 });
        });
    };
  }
}
