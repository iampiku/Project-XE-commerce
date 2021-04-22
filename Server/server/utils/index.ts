import { compare } from "bcrypt";
import { NextFunction } from "express";
import { Request as RQ, Response as R } from "express-serve-static-core";
import { sign, verify } from "jsonwebtoken";
import { extname } from "path";
import { join } from "path";
import { Model } from "sequelize";
import { v4 } from "uuid";
import { User } from "../../database/schema";

export type ResponseInterface = R;
export type RequestInterface = RQ;
export type Next = NextFunction;

/** FileUploadDirectory Path */
export const FileUploadDirectoryPath = join(
  __dirname,
  "..",
  "public",
  "uploads"
);

export const FileUploadFolderStaticServe = join(__dirname, "..", "public");

// Acceptable FileFormat Only any type of images/*
export type AcceptableFileFormat = "image/*";

// FileUploadInterface Schema for Req validation
export interface FileUploadInterface {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: AcceptableFileFormat;
  md5: string;
  mv: (saveFilePath: string) => Promise<any>;
}

// For Uploading Single ImageFile Only
export async function handleSingleFileUpload(files: FileUploadInterface) {
  const savePath = `${FileUploadDirectoryPath}/${
    (files as FileUploadInterface).name
  }`;
  await (files as FileUploadInterface).mv(savePath);
}

export async function handleSingleFileUploadMiddleWare(
  req: Request,
  res: Response,
  next: Next
) {
  // first getting userId from requiresAuth middleware

  try {
    const userId: string = (req as any).userId as string;
    const file: FileUploadInterface = (req.files as any).file;
    const fileName = `${(file as FileUploadInterface).md5}${extname(
      file.name
    )}`;
    const savePath = `${FileUploadDirectoryPath}/${fileName}`;
    await (file as FileUploadInterface).mv(savePath);

    const userObj: Model<any, any> = (await User.findByPk(userId)) as Model;

    (userObj as any).avatar = `/uploads/${fileName}`;

    (req as any).avatarPath = `/uploads/${fileName}`;
    await userObj.save();

    return next();
  } catch (error) {
    return next(error);
  }
}

// For Uploading Multiple ImageFiles Only
export async function handleMutipleFilesUpload(files: FileUploadInterface[]) {
  for (const file of files as FileUploadInterface[]) {
    const savePath = `${FileUploadDirectoryPath}/${file.name}`;
    await file.mv(savePath);
  }
}

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
export const SECRET =
  "e3c99ea48a54c3f4b710d65ebd7592e17d6c4ed112ffc58f595d4d94a409d6b78570801cd79cdeffb3d3cea8f91122cd824c21bb91cf39981410b17252da218b";

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
    SECRET,
    { expiresIn: "2h" }
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

    setAuthorizationHeader(res, token);

    return User.findOne({ where: { id: verified.id } }).then((userPresent) => {
      if (userPresent) {
        req.userId = verified.id;
        return next();
      } else {
        return next(warn(res, FORBIDDEN, "User credentials does not found!"));
      }
    });
  } catch (error) {
    return next(warn(res, FORBIDDEN, error));
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

/** Type Definations */

/** OrderItem Interface for making Order for a user */
export interface OrderItemInterface {
  orderItems: OrderItem[];
  addressId: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}
