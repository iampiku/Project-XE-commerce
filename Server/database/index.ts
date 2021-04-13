import { join } from "path";
import S, { Sequelize } from "sequelize";

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
}

export { connectToDatabase };
