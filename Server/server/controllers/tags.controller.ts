import { Router } from "express";
import { Product, Tag } from "../../database/schema";
import { INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

// [GET] All Tags
router.get("/", async (req, res, next) => {
  try {
    const tags = Tag.findAll({
      include: { model: Product, as: "products" },
    });
    return res.status(OK).send({ ...SUCCESS, tags });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }

  next();
});

// [POST] Create new Tag
router.post("/create", async (req, res, next) => {
  try {
    const resp = await Tag.create(req.body);
    return res
      .status(OK)
      .send({ ...SUCCESS, tag: resp, message: `new tag has been created!` });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
