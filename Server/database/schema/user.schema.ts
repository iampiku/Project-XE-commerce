import Sequelize from "sequelize";
import { db } from "..";

export const User: Sequelize.ModelCtor<Sequelize.Model<any, any>> = db.define(
  "User",
  {
    Name: { type: Sequelize.STRING, allowNull: false },
    Username: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false, unique: true },
    Password: { type: Sequelize.STRING, allowNull: false },
  },
  { freezeTableName: true }
);
