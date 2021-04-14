import { STRING, TEXT } from "sequelize";
import slugify from "slugify";
import { db } from "..";

export const Tag = db.define(
  "Tags",
  {
    name: { type: STRING },
    slug: { type: STRING, allowNull: false },
    desctiption: { type: TEXT },
  },
  {
    freezeTableName: true,
    tableName: "Tags",
    hooks: {
      beforeValidate: function (tag: any, options) {
        tag.slug = slugify(tag.name, { lower: true });
      },
    },
  }
);
