import { Router } from "express";
import { Address, Order, OrderItem, User } from "../../database/schema";
import { Role } from "../../database/schema/role.schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Address, as: "addresses" },
        {
          model: Order,
          include: [{ model: Address }, { model: OrderItem, as: "orderItems" }],
        },
        { model: Role },
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
