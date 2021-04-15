import { Router } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";
import AuthController from "./auth.controller";
import UserController from "./user.controller";
import ProductController from "./product.controller";

const router = Router();

router.get("/data", async (req, res, next) => {
  try {
    res.status(OK).send({
      msg: "server is running",
      status: "OK",
      statusCode: 200,
      ip: req.ip,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

// Controllers
router.use("/users", UserController);
router.use("/auth", AuthController);
router.use("/products", ProductController);

export default router;
