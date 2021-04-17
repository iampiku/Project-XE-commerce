import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { connectToDatabase } from "../database";
import { buildAssociationsBetweenSchemas } from "../database/schema";
import { APIController } from "./controllers";
const PORT = 5000 || process.env.PORT;

const app = express();

export async function serverStart() {
  try {
    await serverConfig();
    await connectToDatabase();
    await (async () => {
      buildAssociationsBetweenSchemas();
    })();

    app.use("/api", APIController);

    app.listen(PORT, () =>
      console.log(`server already started on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error({ error });
  }
}

async function serverConfig() {
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(urlencoded({ extended: false }));
}
