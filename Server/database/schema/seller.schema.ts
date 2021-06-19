import { STRING, TEXT, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";
import { User } from "./user.schema";

export const Seller = db.define(
  "Sellers",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    name: { type: STRING, allowNull: false },
    proprietorName: { type: STRING, allowNull: false },
    address: { type: TEXT, allowNull: false },
    userId: { type: UUIDV4, allowNull: false, references: { model: User } },
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
