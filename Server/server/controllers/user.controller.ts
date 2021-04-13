import { Router } from "express";
import { User } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(OK).send({
      ...SUCCESS,
      users,
    });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
