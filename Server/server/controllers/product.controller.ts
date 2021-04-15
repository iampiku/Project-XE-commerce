import { Router } from "express";
import { Category, Product } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();
// [GET] All products listed
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category, as: "categories" },
    });
    return res.status(OK).send({ allProducts, ...SUCCESS });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, JSON.stringify(error, null, 3));
  }
  next();
});

export default router;
