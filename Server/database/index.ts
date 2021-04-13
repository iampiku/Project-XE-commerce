import { join } from "path";
import S, { Sequelize } from "sequelize";
import slugify from "slugify";

const dir = join(__dirname, "");

export const db = new Sequelize({
  dialect: "sqlite",
  storage: `${dir}/db-store.sqlite`,
  database: "ecommerceX",
});

async function connectToDatabase() {
  try {
    await db.authenticate();
    await buildSchema();
    await db.sync();
    console.log(`## database succesfully connected!!`);
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 3));
  }
}

/** Generating Relevant Schemas */
async function buildSchema() {
  //* For User Schema */
  db.define(
    "User",
    {
      name: { type: S.STRING, allowNull: false },
      id: { type: S.UUIDV4, allowNull: false, primaryKey: true },
      username: { type: S.STRING, allowNull: false },
      email: { type: S.STRING, allowNull: false, unique: true },
      password: { type: S.STRING, allowNull: false },
    },
    { freezeTableName: true }
  );
  //* For Product Schema
  db.define(
    "Products",
    {
      id: { type: S.UUIDV4, primaryKey: true },
      name: { type: S.STRING(50), allowNull: false },
      slug: { type: S.STRING(50), allowNull: false },
      description: { type: S.TEXT, allowNull: false },
      price: { type: S.DECIMAL(10, 2), allowNull: false },
      inStock: { type: S.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "Products",
      indexes: [{ fields: ["slug"] }],
      hooks: {
        beforeValidate: function (product: any, options) {
          product.slug = slugify(product.name, { lower: true });
        },
      },
    }
  );
}

/** Will configure the association Mappings (1:N) / (M:N) / (N:1)  */
function buildAssociationsBetweenSchemas() {}

export { connectToDatabase };
