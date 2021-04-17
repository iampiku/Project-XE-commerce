import { Router } from "express";
import { Address, User } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Address, as: "addresses" },
      ],
      order: [["createdAt", "DESC"]],
    });

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
