import { INTEGER, Model, ModelCtor, STRING, UUIDV4 } from "sequelize";
import { db } from "..";

export const Comment: ModelCtor<Model<any, any>> = db.define(
  "Comments",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    content: { type: STRING, allowNull: false },
    rating: { type: INTEGER, allowNull: false, defaultValue: 1 },
    productId: { type: UUIDV4, allowNull: false },
    userId: { type: UUIDV4, allowNull: false },
  },
  {
    tableName: "Comments",
    freezeTableName: true,
  }
);
