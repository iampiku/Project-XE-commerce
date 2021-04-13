import { Router } from "express";
import { User } from "../../database/schema";
import {
  FORBIDDEN,
  generateAuthToken,
  OK,
  requiresAuth,
  setAuthorizationHeader,
  SignupInterface,
  SUCCESS,
  uuid,
  warn,
} from "../utils";

const router = Router();

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

    return res.status(OK).send({ token, ...SUCCESS });
  } catch (error) {
    warn(res, FORBIDDEN, error);
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
    return res.status(OK).send({ token, ...SUCCESS, loggedIn: true });
  } catch (error) {
    warn(res, FORBIDDEN, "Credentials are not matching!");
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
      ip: req.ip,
      timestamp: Date.now(),
      ...SUCCESS,
    });
  } catch (error) {
    warn(res, FORBIDDEN, "Credentials are not matching!");
  }

  next();
});

// [POST] When User wants LoggedOut
router.post("/logout", requiresAuth, async (req, res, next) => {
  try {
    return res.status(OK).send({ isLoggedIn: false, ...SUCCESS });
  } catch (error) {
    warn(res, FORBIDDEN, "You are not Authorized");
  }
  next();
});

export default router;
