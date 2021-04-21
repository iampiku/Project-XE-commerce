import { Router } from "express";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";
import AuthController from "./auth.controller";
import CategoryController from "./category.controller";
import OrderController from "./order.controller";
import ProductController from "./product.controller";
import RoleController from "./role.controller";
import SellerController from "./seller.controller";
import TagController from "./tags.controller";
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
router.use("/sellers", SellerController);
router.use("/tags", TagController);
router.use("/orders", OrderController);
router.use('/roles', RoleController);

export default router;
