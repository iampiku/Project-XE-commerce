import { DECIMAL, INTEGER, Model, ModelCtor, STRING, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

export const OrderItem: ModelCtor<Model<any, any>> = db.define(
  "OrderItems",
  {
    id: { type: UUIDV4, primaryKey: true },
    name: { type: STRING(60), allowNull: false },
    slug: { type: STRING(60), allowNull: false },
    price: { type: DECIMAL(10, 2), allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    userId: {
      type: UUIDV4,
      allowNull: true,
    },
    orderId: {
      type: UUIDV4,
      allowNull: false,
    },
    productId: {
      type: UUIDV4,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "OrderItems",
    indexes: [{ fields: ["userId", "orderId"] }],
    hooks: {
      beforeValidate: function (orderItem: any, options) {
        orderItem.id = uuid();
      },
    },
  }
);
