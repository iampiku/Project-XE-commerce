import { ENUM, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

export const RoleInterface = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
};

export const Role = db.define(
  "Roles",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    role: {
      type: ENUM,
      values: [
        RoleInterface.ADMIN,
        RoleInterface.CUSTOMER,
        RoleInterface.SELLER,
      ],
    },
  },
  {
    freezeTableName: true,
    tableName: "Roles",
    hooks: {
      beforeValidate: function (role: any, options) {
        role.id = uuid();
      },
    },
  }
);
