import _ from "lodash";
import { DECIMAL } from "sequelize";
import { ENUM, Model, ModelCtor, STRING, UUIDV4, VIRTUAL } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

/** Order Status - [Processed, Delivered, Shipped] */
export const ORDER_STATUS = {
  PROCESSED: "PROCESSED",
  DELIVERED: "DELIVERED",
  SHIPPED: "SHIPPED",
};

export const Order: ModelCtor<Model<any, any>> = db.define(
  "Orders",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    trackingId: { type: STRING, allowNull: false },
    orderStatus: {
      type: ENUM,
      values: [
        // String(ORDER_STATUS.PROCESSED.ordinal),
        // String(ORDER_STATUS.DELIVERED.ordinal),
        // String(ORDER_STATUS.SHIPPED.ordinal),
        ORDER_STATUS.PROCESSED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.SHIPPED,
      ],
      defaultValue: ORDER_STATUS.PROCESSED,
    },
    subtotal: { type: DECIMAL(10, 2) },
    orderStatusString: {
      type: VIRTUAL,
      get: function () {
        let res: string | null = null;
        _.forOwn(ORDER_STATUS, (v, k) => {
          if (String(v) === this.getDataValue("orderStatus")) res = k;
          return res;
        });
      },
    },
    userId: { type: UUIDV4, allowNull: false },
    addressId: {
      type: UUIDV4,
      allowNull: false,
      references: { model: `Addresses`, key: "id" },
    },
  },
  {
    freezeTableName: true,
    tableName: "Orders",
    hooks: {
      beforeValidate: function (order: any, options) {
        order.id = uuid();
        order.trackingId = uuid();
      },
    },
    indexes: [{ fields: ["trackingId"] }],
  }
);
