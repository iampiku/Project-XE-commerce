import { Router } from "express";
import { Category, Product, ProductCategory, Tag } from "../../database/schema";
import { Seller } from "../../database/schema/seller.schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All products listed
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        { model: Seller },
        { model: Category, as: "categories" },
        { model: Tag, as: "tags" },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(OK).send({ allProducts, ...SUCCESS });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

router.post("/create", async (req, res, next) => {
  try {
    const payload = req.body;
    const resp = await Product.create(payload);
    for (const categoryId of payload.categoryIds) {
      const pc = { productId: resp.getDataValue("id"), categoryId };
      await ProductCategory.create(pc);
    }
    return res
      .status(OK)
      .send({ ...SUCCESS, resp, message: `product has been created!` });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
