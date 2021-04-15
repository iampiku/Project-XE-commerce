import { Model, ModelCtor } from "sequelize";
import { db } from "..";

export const ProductTag: ModelCtor<Model<any, any>> = db.define("ProductTags", {});