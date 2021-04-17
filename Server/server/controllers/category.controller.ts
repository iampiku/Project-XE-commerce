import { Router } from "express";
import { Category, Product } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All categories
router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Category.findAll({
      include: {
        model: Product,
        as: "products",
      },
      order: [['createdAt', 'DESC']]
    });

    return res.status(OK).send({ ...SUCCESS, allCategories });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
});

// [POST] Create a new Category
router.post("/create", async (req, res, next) => {
  try {
    const resp = await Category.create(req.body);
    return res.status(OK).send({
      resp,
      ...SUCCESS,
      message: `${req.body.name} category has been created`,
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

export default router;
