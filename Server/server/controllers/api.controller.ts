import { Router } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";
import AuthController from "./auth.controller";
import CategoryController from "./category.controller";
import ProductController from "./product.controller";
import SellerController from "./seller.controller";
import UserController from "./user.controller";

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
router.use("/categories", CategoryController);
router.use('/sellers', SellerController);

export default router;
