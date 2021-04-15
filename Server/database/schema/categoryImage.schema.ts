import { Model, ModelCtor, STRING, UUIDV4 } from "sequelize";
import { db } from "..";

export const CategoryImage: ModelCtor<Model<any, any>> = db.define(
  "CategoryImages",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    filename: { type: STRING, allowNull: false },
    filepath: { type: STRING, allowNull: false },
    originalName: { type: STRING, allowNull: false },
    fileSize: { type: STRING, allowNull: false },
    categoryId: { type: UUIDV4, allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "CategoryImages",
  }
);
