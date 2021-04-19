import { compare } from "bcrypt";
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

/** Check For Password Matches with HashedPassword */
export async function compareWithHashifiedPassword(
  password: string,
  checkIfUserNameExists: any
): Promise<boolean> {
  return (await compare(password, checkIfUserNameExists.password)) as boolean;
}

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
      id: resp.dataValues.id,
      username: resp.dataValues.username,
      email: resp.dataValues.email,
    } as TokenInterface,
    SECRET
  );
}

/** Authorization Check MiddleWare - True/False */
export const requiresAuth = (req: any, res: any, next: any) => {
  try {
    /** If no `authorization` header present
     * then return Error(Unauthorized) */
    if (!req.headers["authorization"]) {
      return next(warn(res, FORBIDDEN, "You are not authorized"));
    }
    /** Else Continue for check */
    const token = req.headers["authorization"].split(" ")[1] as string;

    if (!token) {
      return next(warn(res, FORBIDDEN, "You are not authorized"));
    }
    const verified: TokenInterface = verify(token, SECRET) as TokenInterface;
    console.log({ verified });

    return User.findOne({ where: { id: verified.id } }).then((userPresent) => {
      if (userPresent) return next();
      else {
        return next(warn(res, FORBIDDEN, "User credentials does not found!"));
      }
    });
  } catch (error) {
    return next(error);
  }
};

/** Set Authorization Header */
export function setAuthorizationHeader(res: any, token: string) {
  res.setHeader("authorization", `Bearer ${token}`);
}

/** ON Successfull Response */
type HttpResp = { statusCode: number; status: boolean };
export const SUCCESS: HttpResp = { statusCode: OK, status: true };

/** Order Status - [Processed, Delivered, Shipped] */
export const ORDER_STATUS = {
  PROCESSED: { ordinal: 0 },
  DELIVERED: { ordinal: 1 },
  SHIPPED: { ordinal: 2 },
};
