import { sign, verify } from "jsonwebtoken";
import { v4 } from "uuid";
import { User } from "../../database/schema";

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
export function warn(res: any, code: number, error: any) {
  return res.status(code).send({
    error: error.errors || error,
    message: "Error Occured",
    status: false,
    statusCode: code,
  });
}

/** Interfaces */
export interface SignupInterface {
  email: string;
  name: string;
  password: string;
  username: string;
}

/** JSONWebToken SECRET */
export const SECRET = `BHS@^%&%!*&^87/#$bj1agcs%$#^%$@%^fgyavsdu765712678356416JHSA^&@%^&!$%$`;
type TokenInterface = {
  id: string;
  username: string;
  email: string;
};
/** Generate Auth Token from Resp */
export function generateAuthToken(resp: any) {
  return sign(
    {
      id: resp.id,
      username: resp.username,
      email: resp.email,
    } as TokenInterface,
    SECRET
  );
}

/** Authorization Check MiddleWare - True/False */
export const requiresAuth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers["authorization"] as string;

    if (!token) {
      throw new Error("You are not authorized");
    }
    const verified: TokenInterface = verify(token, SECRET) as TokenInterface;
    console.log({ verified });

    User.findOne({ where: { id: verified.id } }).then((userPresent) => {
      if (userPresent) return next();
      else {
        warn(res, FORBIDDEN, "User credentials does not found!");
      }
    });
  } catch (error) {
    warn(res, FORBIDDEN, "You are not authorized");
  }
  next();
};

/** Set Authorization Header */
export function setAuthorizationHeader(res: any, token: string) {
  res.setHeader("authorization", `Bearer ${token}`);
}

/** ON Successfull Response */
type HttpResp = { statusCode: number; status: boolean };
export const SUCCESS: HttpResp = { statusCode: OK, status: true };
