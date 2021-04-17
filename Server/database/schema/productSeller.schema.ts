import { UUIDV4 } from "sequelize";
import { db } from "..";
import { Product } from "./product.schema";

export const ProductSeller = db.define(
  "ProductSellers",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    productId: { type: UUIDV4, allowNull: false },
    sellerId: {
      type: UUIDV4,
      allowNull: false,
      references: { model: Product, key: "sellerId" },
    },
  },
  {
    freezeTableName: true,
    tableName: "ProductSellers",
  }
);
