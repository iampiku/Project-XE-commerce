import _ from "lodash";
import {v4 as uuid} from 'uuid';
import { Model, ModelCtor, STRING, UUIDV4, VIRTUAL } from "sequelize";
import { db } from "..";

/** Order Status - [Processed, Delivered, Shipped] */
export const ORDER_STATUS = {
  PROCESSED: { ordinal: 0 },
  DELIVERED: { ordinal: 1 },
  SHIPPED: { ordinal: 2 },
};

export const Order: ModelCtor<Model<any, any>> = db.define(
  "Orders",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    trackingId: { type: STRING, allowNull: false },
    orderStatus: {
      type: STRING,
      values: [
        String(ORDER_STATUS.PROCESSED.ordinal),
        String(ORDER_STATUS.DELIVERED.ordinal),
        String(ORDER_STATUS.SHIPPED.ordinal),
      ],
    },
    orderStatusString: {
      type: VIRTUAL,
      get: function () {
        let res: string | null = null;
        _.forOwn(ORDER_STATUS, (v, k) => {
          if (String(v.ordinal) === this.getDataValue("orderStatus")) res = k;
          return res;
        });
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "Orders",
    hooks: {
      beforeValidate: function(order: any, options) {
        order.id = uuid();
      }
    },
    indexes: [
        {fields: ['trackingId']}
    ]
  }
);
