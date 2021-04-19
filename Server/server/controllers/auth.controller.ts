import { Router } from "express";
import { Address, Order, User } from "../../database/schema";
import {
  compareWithHashifiedPassword,
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

// [POST] Create User Account
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

    return res.status(OK).send({
      token,
      ...SUCCESS,
      userId: resp.id,
      message: `user account has been created!`,
    });
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
      warn(res, FORBIDDEN, `fields are not formatted correctly`);
    }

    // check in database if DataFragment Found
    const checkIfUserNameExists: any = await User.findOne({
      where: { username },
    });

    if (checkIfUserNameExists === null) {
      warn(res, FORBIDDEN, "username does not exists");
    }

    const passwordMatch = await compareWithHashifiedPassword(
      password,
      checkIfUserNameExists
    );

    if (passwordMatch) {
      const payload = { ...checkIfUserNameExists };
      const token: string = generateAuthToken(payload);
      setAuthorizationHeader(res, token);
      return res.status(OK).send({
        token,
        ...SUCCESS,
        isLoggedIn: true,
        userId: checkIfUserNameExists.id,
      });
    } else {
      warn(res, FORBIDDEN, "password does not matching!");
    }
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

// [POST] Getting all orders for the user
router.post("/user/:id/orders/all", requiresAuth, async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    /** Getting all the orders from OrderSchema for UserId = `id` */
    const allOrders = await Order.findAll({
      where: { userId: id },
      include: [{ model: Address }],
      group: ["createdAt"],
    });

    console.log({ allOrders });

    return res.status(OK).send({ ...SUCCESS, allOrders, userId: id });
  } catch (error) {
    warn(res, FORBIDDEN, error || "You are not authorized");
  }
  next();
});

router.post("/user/address/create", requiresAuth, async (req, res, next) => {
  try {
    const resp = await Address.create(req.body);
    return res
      .status(OK)
      .send({ ...SUCCESS, resp, message: `address has been created!` });
  } catch (error) {
    warn(res, FORBIDDEN, error || "You are not authorized");
  }
  next();
});

export default router;
