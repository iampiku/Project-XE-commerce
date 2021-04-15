import { Model, ModelCtor, UUIDV4 } from "sequelize";
import { v4 as uuid } from 'uuid';
import { db } from "..";

export const ProductTag: ModelCtor<Model<any, any>> = db.define(
  "ProductTags",
  {
      id: {type: UUIDV4, primaryKey: true, allowNull: false},
    productId: {
      type: UUIDV4,
    },
    tagId: {
      type: UUIDV4,
    },
  },
  {
    freezeTableName: true,
    tableName: "ProductTags",
    hooks: {
        beforeValidate: function(proTag: any, options) {
            proTag.id = uuid();
        }
    }
  }
);
