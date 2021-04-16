import _ from "lodash";
import { join } from "path";
import S, { Sequelize } from "sequelize";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

const dir = join(__dirname, "");

export const db = new Sequelize({
  dialect: "sqlite",
  storage: `${dir}/db-store.sqlite`,
  database: "ecommerceX",
});

async function connectToDatabase() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(`## database succesfully connected!!`);
    await buildSchema();
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 3));
  }
}

/** Generating Relevant Schemas */
async function buildSchema() {
  // CreateAddressSchema();
  // CreateCategoryImageSchema();
  // CreateCategorySchema();
  // CreateCommentSchema();
  // CreateOrderItemSchema();
  // CreateOrderSchema();
  // CreateProductCategorySchema();
  // CreateProductSchema();
  // CreateProductTagSchema();
  // CreateTagSchema();
  // CreateUserSchema();
}

// * Generation of Schemas Architecture
// function CreateUserSchema() {
//   //* For User Schema */
//   db.define(
//     "User",
//     {
//       name: { type: S.STRING, allowNull: false },
//       id: { type: S.UUIDV4, allowNull: false, primaryKey: true },
//       username: { type: S.STRING, allowNull: false },
//       email: { type: S.STRING, allowNull: false, unique: true },
//       password: { type: S.STRING, allowNull: false },
//     },
//     { freezeTableName: true }
//   );
// }

// function CreateProductSchema() {
//   //* For Product Schema
//   db.define(
//     "Products",
//     {
//       id: { type: S.UUIDV4, primaryKey: true },
//       name: { type: S.STRING(50), allowNull: false },
//       slug: { type: S.STRING(50), allowNull: false },
//       description: { type: S.TEXT, allowNull: false },
//       price: { type: S.DECIMAL(10, 2), allowNull: false },
//       inStock: { type: S.INTEGER, allowNull: false },
//     },
//     {
//       freezeTableName: true,
//       tableName: "Products",
//       indexes: [{ fields: ["slug"] }],
//       hooks: {
//         beforeValidate: function (product: any, options) {
//           product.slug = slugify(product.name, { lower: true });
//         },
//       },
//     }
//   );
// }

// function CreateAddressSchema() {
//   db.define(
//     "Addresses",
//     {
//       id: { type: S.UUIDV4, primaryKey: true, allowNull: false },
//       city: { type: S.STRING(30), allowNull: false },
//       address: { type: S.STRING(30), allowNull: false },
//       country: { type: S.STRING(30), allowNull: false },
//       zipCode: { type: S.STRING(30), allowNull: false },
//     },
//     {
//       freezeTableName: true,
//       tableName: "Addresses",
//       hooks: {
//         beforeValidate: function (address: any, options) {
//           address.id = uuid();
//         },
//       },
//     }
//   );
// }

// function CreateCategorySchema() {
//   db.define(
//     "Categories",
//     {
//       id: { type: S.UUIDV4, allowNull: false, primaryKey: true },
//       name: { type: S.STRING(50), allowNull: false },
//       slug: { type: S.STRING(50), allowNull: false },
//       description: { type: S.TEXT },
//     },
//     {
//       freezeTableName: true,
//       tableName: "Categories",
//       hooks: {
//         beforeValidate: function (category: any, options) {
//           category.slug = slugify(category.name, { lower: true });
//           category.id = uuid();
//         },
//       },
//     }
//   );
// }

// function CreateCategoryImageSchema() {
//   db.define(
//     "CategoryImages",
//     {
//       id: { type: S.UUIDV4, primaryKey: true, allowNull: false },
//       filename: { type: S.STRING, allowNull: false },
//       filepath: { type: S.STRING, allowNull: false },
//       originalName: { type: S.STRING, allowNull: false },
//       fileSize: { type: S.STRING, allowNull: false },
//     },
//     {
//       freezeTableName: true,
//       tableName: "CategoryImages",
//     }
//   );
// }

// function CreateCommentSchema() {
//   db.define(
//     "Comments",
//     {
//       id: { type: S.UUIDV4, primaryKey: true, allowNull: false },
//       content: { type: S.STRING, allowNull: false },
//       rating: { type: S.INTEGER, allowNull: false, defaultValue: 1 },
//     },
//     {
//       tableName: "Comments",
//       freezeTableName: true,
//     }
//   );
// }

// function CreateOrderSchema() {
//   /** Order Status - [Processed, Delivered, Shipped] */
//   const ORDER_STATUS = {
//     PROCESSED: { ordinal: 0 },
//     DELIVERED: { ordinal: 1 },
//     SHIPPED: { ordinal: 2 },
//   };

//   db.define(
//     "Orders",
//     {
//       id: { type: S.UUIDV4, primaryKey: true, allowNull: false },
//       trackingId: { type: S.STRING, allowNull: false },
//       orderStatus: {
//         type: S.STRING,
//         values: [
//           String(ORDER_STATUS.PROCESSED.ordinal),
//           String(ORDER_STATUS.DELIVERED.ordinal),
//           String(ORDER_STATUS.SHIPPED.ordinal),
//         ],
//       },
//       orderStatusString: {
//         type: S.VIRTUAL,
//         get: function () {
//           let res: string | null = null;
//           _.forOwn(ORDER_STATUS, (v, k) => {
//             if (String(v.ordinal) === this.getDataValue("orderStatus")) res = k;
//             return res;
//           });
//         },
//       },
//     },
//     {
//       freezeTableName: true,
//       tableName: "Orders",
//       hooks: {
//         beforeValidate: function (order: any, options) {
//           order.id = uuid();
//         },
//       },
//       indexes: [{ fields: ["trackingId"] }],
//     }
//   );
// }

// function CreateOrderItemSchema() {
//   db.define(
//     "OrderItems",
//     {
//       id: { type: S.UUIDV4, primaryKey: true },
//       name: { type: S.STRING(60), allowNull: false },
//       slug: { type: S.STRING(60), allowNull: false },
//       price: { type: S.DECIMAL(10, 2), allowNull: false },
//       quantity: { type: S.INTEGER, allowNull: false },
//     },
//     {
//       freezeTableName: true,
//       tableName: "OrderItems",
//       hooks: {
//         beforeValidate: function (orderItem: any, options) {
//           orderItem.id = uuid();
//         },
//       },
//     }
//   );
// }

// function CreateProductCategorySchema() {
//   db.define("ProductCategories", {});
// }

// function CreateProductTagSchema() {
//   db.define("ProductTags", {});
// }

// function CreateTagSchema() {
//   db.define(
//     "Tags",
//     {
//       name: { type: S.STRING },
//       slug: { type: S.STRING, allowNull: false },
//       desctiption: { type: S.TEXT },
//     },
//     {
//       freezeTableName: true,
//       tableName: "Tags",
//       hooks: {
//         beforeValidate: function (tag: any, options) {
//           tag.slug = slugify(tag.name, { lower: true });
//         },
//       },
//     }
//   );
// }

export { connectToDatabase };
