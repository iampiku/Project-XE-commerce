import { Model, ModelCtor, UUIDV4 } from "sequelize";
import { v4 as uuid } from 'uuid';
import { db } from "..";

export const ProductCategory: ModelCtor<Model<any, any>> = db.define(
  "ProductCategories",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    productId: {type: UUIDV4, allowNull: false},
    categoryId: {type: UUIDV4, allowNull: false},
  }, {
    hooks: {
      beforeValidate: function(proCat: any, options) {
        proCat.id = uuid();
      }
    }
  }
);
