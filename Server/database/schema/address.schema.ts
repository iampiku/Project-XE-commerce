import { Model, ModelCtor, STRING, UUIDV4 } from "sequelize";
import { db } from "..";

export const Address: ModelCtor<Model<any, any>> = db.define(
  "Addresses",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    city: { type: STRING(30), allowNull: false },
    address: { type: STRING(30), allowNull: false },
    country: { type: STRING(30), allowNull: false },
    zipCode: { type: STRING(30), allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "Addresses",
  }
);
