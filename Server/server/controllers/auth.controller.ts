import { Router } from "express";
import { Address, Order, OrderItem, User } from "../../database/schema";
import { Role, RoleInterface } from "../../database/schema/role.schema";
import {
  compareWithHashifiedPassword,
  FORBIDDEN,
  generateAuthToken,
  INTERNAL_SERVER_ERROR,
  OK,
  requiresAuth,
  setAuthorizationHeader,
  SignupInterface,
  SUCCESS,
  warn,
} from "../utils";

const router = Router();

// [POST] Create User Account
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body as SignupInterface;

    // Setting up Default Role as ~ CustomerRole
    const customerRole = await Role.findOne({
      where: { role: RoleInterface.CUSTOMER },
    });

    const payload = {
      name,
      email,
      roleId: (customerRole as any).dataValues.id,
      username,
      password,
    };

    // Some perfoming Sanity Checks
    // If Username Exists
    // Or UserEmail Exists
    const checkIfUserNameExists = await User.findOne({
      where: { username },
    });
    if (checkIfUserNameExists) {
      return warn(res, INTERNAL_SERVER_ERROR, "Username already taken");
    }
    const checkIfEmailExists = await User.findOne({
      where: { email },
    });
    if (checkIfUserNameExists || checkIfEmailExists) {
      return warn(res, INTERNAL_SERVER_ERROR, "User email is already taken");
    }

    const resp: any = await User.create(payload);
    const token = generateAuthToken(resp);

    setAuthorizationHeader(res, token);

    return res.status(OK).send({
      token,
      ...SUCCESS,
      userId: resp.id,
      isLoggedIn: true,
      message: `user account has been created!`,
    });
  } catch (error) {
    warn(res, FORBIDDEN, "User account already exists!");
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
router.get("/user/orders/all", requiresAuth, async (req, res, next) => {
  try {
    const { userId } = req as any;

    /** Getting all the orders from OrderSchema for UserId = `id` */
    const allOrders = await Order.findAll({
      include: [{ model: OrderItem, as: "orderItems" }, { model: Address }],
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    return res.status(OK).send({ ...SUCCESS, allOrders, userId });
  } catch (error) {
    warn(res, FORBIDDEN, error || "You are not authorized");
  }
  next();
});

// [Post] To Create several address for user which userId (requiresAuth.middleware)
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

// [POST upgrading an existing user to a SELLER!


export default router;
