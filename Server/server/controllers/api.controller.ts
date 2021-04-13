import { Router } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";
import AuthController from './auth.controller';
import UserController from "./user.controller";

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

// User Controller
router.use("/users", UserController);
router.use("/auth", AuthController);

export default router;
