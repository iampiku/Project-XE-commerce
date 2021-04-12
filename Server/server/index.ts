import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { OK } from "./utils";
const PORT = 5000 || process.env.PORT;

const app = express();

export async function serverStart() {
  try {
    await serverConfig();

    app.get("/api/data", async (req, res, next) => {
      res.status(OK).send({
        msg: "server is running",
        status: "OK",
        statusCode: 200,
        ip: "192.168.52.3",
        timestamp: Date.now(),
      });
    });

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
