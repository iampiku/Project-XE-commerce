import { Router } from "express";
import { User } from "../../database/schema";
import {
  generateAuthToken,
  OK,
  setAuthorizationHeader,
  SignupInterface,
  uuid,
  warn
} from "../utils";

const router = Router();

// [GET] All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(OK).send({
      status: "success",
      statusCode: 200,
      users,
    });
  } catch (error) {
    // warn(res, error);
  }
  next();
});

// [POST] Create User
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body as SignupInterface;

    const payload = {
      name,
      email,
      id: uuid(),
      username,
      password,
    };

    const resp: any = await User.create(payload);
    const token = generateAuthToken(resp);

    setAuthorizationHeader(res, token);

    return res.status(OK).send({ token, success: true, statusCode: 200 });
  } catch (error) {
    warn(res, error);
  }
  next();
});

// [POST] User Login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username === "" || password === "") {
      throw new Error(`fields are not formatted correctly`);
    }

    // check in database if DataFragment Found
    const resp: any = await User.findOne({ where: { username, password } });

    if (resp === null) {
      throw new Error("Credentials Not matched");
    }

    const token = generateAuthToken(resp);

    setAuthorizationHeader(res, token);
    return res.status(OK).send({ token, success: true, statusCode: 200 });
  } catch (error) {
    warn(res, "Credentials are not matching!");
  }
  next();
});

// [POST] Reset Password Link
router.post("/reset-password", async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const resp = await User.findOne({ where: { username, email } });

    const resetToken = generateAuthToken(resp);
    return res.status(OK).send({
      resetToken,
      timestamp: Date.now(),
    });
  } catch (error) {
    warn(res, "Credentials are not matching!");
  }

  next();
});

export default router;
