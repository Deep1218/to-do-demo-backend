import { ResponseCode, ResponseMessage } from "./config/constants";
import { Failure } from "./error";

export class ResponseBuilder {
  public code!: number;
  public msg!: string;
  public error!: string;
  public data!: any;
  public description!: string;

  public static successMessage(msg: string = "Sucess"): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.SUCCESS_CODE;
    rb.msg = msg;
    return rb;
  }

  public static validation(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.FORBIDDEN_CODE;
    rb.msg = msg;
    return rb;
  }

  public static notFound(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.NOT_FOUND_CODE;
    rb.msg = msg;
    return rb;
  }

  public static errorMessage(msg?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.INTERNAL_SERVER_ERROR_CODE;
    rb.msg = msg || ResponseMessage.INTERNAL_SERVER_ERROR;
    return rb;
  }

  public static badRequest(msg: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.FAIL_CODE;
    rb.error = msg;
    return rb;
  }

  public static data(result: any, msg?: any): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = ResponseCode.SUCCESS_CODE;
    rb.data = result;
    rb.msg = msg || null;
    return rb;
  }

  public static error(err: Failure) {
    const rb: ResponseBuilder = new ResponseBuilder();
    if (err.type === ResponseMessage.BAD_DATA) {
      rb.code = ResponseCode.FAIL_CODE;
      rb.error = err.title;
      rb.description = err.description;
      rb.data = err.data;
      return rb;
    }
    rb.code = ResponseCode.INTERNAL_SERVER_ERROR_CODE;
    rb.error = err.title || ResponseMessage.INTERNAL_SERVER_ERROR;
    rb.description = err.description;
    rb.data = err.data;
    return rb;
  }
  public static unauthorised() {
    const rb = new ResponseBuilder();
    rb.code = ResponseCode.UNAUTHORIZED_CODE;
    rb.error = ResponseMessage.UNAUTHORIZED;
    return rb;
  }
}
