import Sequelize from "sequelize";
import { db } from "..";

export const User: Sequelize.ModelCtor<Sequelize.Model<any, any>> = db.define(
  "Users",
  {
    name: { type: Sequelize.STRING, allowNull: false },
    id: { type: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
    username: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
  },
  { freezeTableName: true, tableName: "Users" }
);