import { Router } from "express";
import { User } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";

const router = Router();

router.get("/data", async (req, res, next) => {
  try {
    res.status(OK).send({
      msg: "server is running",
      status: "OK",
      statusCode: 200,
      ip: "192.168.52.3",
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

router.get("/users", async (req, res, next) => {
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
