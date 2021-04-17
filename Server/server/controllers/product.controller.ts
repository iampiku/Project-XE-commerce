import { Router } from "express";
import { Category, Product, Tag } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();
// [GET] All products listed
router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Category.findAll();
    const allProducts = await Product.findAll({
      include: [
        { model: Category, as: "categories" },
        { model: Tag, as: "tags" },
      ],
    });
    return res.status(OK).send({ allProducts, allCategories ,...SUCCESS });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
