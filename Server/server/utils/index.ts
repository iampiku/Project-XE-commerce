import { v4 } from "uuid";

/** Geneerating UUID */
export const uuid = v4;

/** HTTP RESPONSE CODES */
export const OK = 200;
export const MULTIPLE_CHOICE = 300;
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const TO_MANY_REQUESTS = 429;
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILBLE = 503;

/** Typed {Req, Res} from Express Middle */
export type Request = Express.Request;
export type Response = Express.Response;

/** When BadErrors Occurs On Response */
export function warn(res: any, error: any) {
  const er = error.errors || error;
  return res.status(INTERNAL_SERVER_ERROR).send(er);
}

/** Interfaces */
export interface SignupInterface {
  email: string;
  name: string;
  password: string;
  username: string;
}
