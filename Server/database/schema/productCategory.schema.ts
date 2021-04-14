import { Model, ModelCtor } from "sequelize";
import { db } from "..";

export const ProductCategory: ModelCtor<Model<any, any>> = db.define(
  "ProductCategories",
  {}
);
