import { validate } from "class-validator";

export class Model {
  public static async getModel(
    model: any,
    body: any,
    query?: any
  ): Promise<Model> {
    try {
      const m2 = new model(body, query);
      const errors = await validate(m2);
      if (errors.length) {
        throw errors;
      }
      return m2;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}
