import { STRING } from "sequelize";
import { TEXT } from "sequelize";
import { UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

export const Seller = db.define(
  "Sellers",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    name: { type: STRING, allowNull: false },
    proprietorName: { type: STRING, allowNull: false },
    address: { type: TEXT, allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "Sellers",
    hooks: {
      beforeValidate: function (seller: any, options) {
        seller.id = uuid();
      },
    },
  }
);
