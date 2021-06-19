import { Model, ModelCtor, Sequelize, STRING, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

export const Address: ModelCtor<Model<any, any>> = db.define(
  "Addresses",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    city: { type: STRING(30), allowNull: false },
    type: { type: STRING(20), allowNull: false },
    address: { type: STRING(30), allowNull: false },
    country: { type: STRING(30), allowNull: false },
    zipCode: { type: STRING(30), allowNull: false },
    userId: { type: UUIDV4, allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "Addresses",
    hooks: {
      beforeValidate: function (address: any, options) {
        address.id = uuid();
      },
    },
  }
);
