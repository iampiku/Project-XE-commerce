import { Router } from "express";
import { Op } from "sequelize";
import {
  Category,
  Product,
  ProductCategory,
  ProductTag,
  Tag,
} from "../../database/schema";
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
    return res
      .status(OK)
      .send({ allProducts, ...SUCCESS, found: allProducts.length });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

router.post("/create", async (req, res, next) => {
  try {
    const payload = req.body;
    const resp = await Product.create(payload);
    if (payload.categoryIds) {
      for (const categoryId of payload.categoryIds) {
        const pc = { productId: resp.getDataValue("id"), categoryId };
        await ProductCategory.create(pc);
      }
    }
    if (payload.tagIds) {
      for (const tagId of payload.tagIds) {
        const tc = { productId: resp.getDataValue("id"), tagId };
        await ProductTag.create(tc);
      }
    }
    return res
      .status(OK)
      .send({ ...SUCCESS, resp, message: `product has been created!` });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

// [GET] Search Product By Id/slug : api/products/search?id=8a0216c9-f0d5-4e1e-8e52-89a76caa0848
router.get("/search", async (req, res, next) => {
  try {
    const searchParams: any = req.query;
    /** Find by Id */
    if (searchParams.id) {
      const product = await Product.findByPk(searchParams.id, {
        include: [
          { model: Seller },
          { model: Category, as: "categories" },
          { model: Tag, as: "tags" },
        ],
      });
      if (product === null)
        warn(
          res,
          INTERNAL_SERVER_ERROR,
          `product ${searchParams.id} could not be found!`
        );
      return res.status(OK).send({ ...SUCCESS, product });
    }
    /** Find By Slug */
    if (searchParams.slug) {
      const products = await Product.findAll({
        where: { slug: { [Op.like]: `%${searchParams.slug}%` } },
        include: [
          { model: Seller },
          { model: Category, as: "categories" },
          { model: Tag, as: "tags" },
        ],
      });
      if (products === null)
        warn(
          res,
          INTERNAL_SERVER_ERROR,
          `${searchParams.slug} could not be found!`
        );
      return res
        .status(OK)
        .send({ ...SUCCESS, products, found: products.length });
    }
    /** Full Text Based Search */
    if (searchParams.name) {
      const products = await Product.findAll({
        where: { name: { [Op.like]: `%${searchParams.name}%` } },
        include: [
          { model: Seller },
          { model: Category, as: "categories" },
          { model: Tag, as: "tags" },
        ],
      });
      if (products === null)
        warn(
          res,
          INTERNAL_SERVER_ERROR,
          `${searchParams.name} could not be found!`
        );
      return res
        .status(OK)
        .send({ ...SUCCESS, products, found: products.length });
    }

    return res.status(OK).send({ ...SUCCESS, searchParams });
  } catch (error) {
    warn(res, INTERNAL_SERVER_ERROR, error);
  }
  next();
});

export default router;
