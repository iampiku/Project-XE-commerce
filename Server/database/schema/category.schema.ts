import { Model, ModelCtor, STRING, TEXT, UUIDV4 } from "sequelize";
import slugify from "slugify";
import { v4 } from "uuid";
import { db } from "..";

const uuid = v4;

export const Category: ModelCtor<Model<any, any>> = db.define(
  "Categories",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    name: { type: STRING(50), allowNull: false, unique: true },
    slug: { type: STRING(50), allowNull: false },
    description: { type: TEXT },
  },
  {
    freezeTableName: true,
    tableName: "Categories",
    hooks: {
      beforeValidate: function (category: any, options) {
        category.slug = slugify(category.name, { lower: true });
        category.id = uuid();
      },
    },
  }
);
