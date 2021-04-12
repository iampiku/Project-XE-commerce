import { Router } from "express";
import { User } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(OK).send({
      status: "success",
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

export default router;
