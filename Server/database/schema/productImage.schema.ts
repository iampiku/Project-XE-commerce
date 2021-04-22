import { UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";
import { db } from "..";

/** might be not neccassry as of now
 * did not calculate the `functional dependency` yet!!
 * Hope, not too much dependent on schemas like - 
 * Products / Categories
 */
export const ProductImage = db.define(
  "ProductImages",
  {
    id: { type: UUIDV4, allowNull: false, primaryKey: true },
    productId: { type: UUIDV4, allowNull: false },
    fileuploadId: { type: UUIDV4, allowNull: false },
  },
  {
    freezeTableName: true,
    tableName: "FileUploads",
    indexes: [{ fields: ["productId"] }],
    hooks: {
      beforeCreate: function (file: any, options) {
        file.id = uuid();
      },
    },
  }
);
