import { Model, ModelCtor, NUMBER, STRING, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

/**
 *  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: AcceptableFileFormat;
  md5: string;
  mv: (saveFilePath: string) => Promise<any>;
 */

export const FileUpload: ModelCtor<Model<any, any>> = db.define(
  "FileUploads",
  {
    id: { type: UUIDV4, primaryKey: true, allowNull: false },
    originalName: { type: STRING, allowNull: false },
    name: { type: STRING, allowNull: false },
    size: { type: NUMBER, allowNull: false },
    encoding: { type: STRING, allowNull: false },
    tempFilePath: { type: STRING, allowNull: false },
    mimetype: { type: STRING, allowNull: false },
    storagePath: { type: STRING, allowNull: false },
    productId: { type: UUIDV4, allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "FileUploads",
    indexes: [{ fields: ["productId", "id"] }],
    hooks: {
      beforeValidate: function (file: any, options) {
        file.id = uuid();
      },
    },
  }
);
