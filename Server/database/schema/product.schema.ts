import S from "sequelize";
import slugify from "slugify";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

export const Product: S.ModelCtor<S.Model<any, any>> = db.define(
  "Products",
  {
    id: { type: S.UUIDV4, primaryKey: true },
    name: { type: S.STRING(50), allowNull: false },
    slug: { type: S.STRING(50), allowNull: false },
    brand: { type: S.STRING, allowNull: false },
    description: { type: S.TEXT, allowNull: false },
    price: { type: S.DECIMAL(10, 2), allowNull: false },
    inStock: { type: S.INTEGER, allowNull: false },
    sellerId: {
      type: S.UUIDV4,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Products",
    indexes: [{ fields: ["slug"] }, { fields: ["brand"] }],
    hooks: {
      beforeValidate: function (product: any, options) {
        product.slug = slugify(product.name, { lower: true });
        product.id = uuid();
      },
    },
  }
);
