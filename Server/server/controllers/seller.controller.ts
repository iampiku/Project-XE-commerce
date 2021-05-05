import { Router } from "express";
import { Product } from "../../database/schema";
import { Seller } from "../../database/schema/seller.schema";
import {INTERNAL_SERVER_ERROR, OK, requiresToBeAdmin, SUCCESS, warn} from "../utils";

const router = Router();

// [GET] All the sellers
router.get("/", async (req, res, next) => {
  try {
    const allSellers = await Seller.findAll({
      include: { model: Product, as: "products" },
    });
    return res.status(OK).send({ ...SUCCESS, allSellers });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }

  next();
});

router.post("/create", requiresToBeAdmin, async (req, res, next) => {
  try {
    const resp = await Seller.create(req.body);
    return res
      .status(OK)
      .send({ ...SUCCESS, resp, message: `seller has been created!` });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
