import { Router } from "express";
import { User } from "../../database/schema";
import { Role } from "../../database/schema/role.schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const roles = await Role.findAll({ include: { model: User } });
    return res.status(OK).send({ ...SUCCESS, roles });
  } catch (error) {
    next(warn(res, INTERNAL_SERVER_ERROR, error));
  }
});

export default router;
