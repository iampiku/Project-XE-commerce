import { fork, isMaster } from "cluster";
import cors from "cors";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { cpus } from "os";
import { on, pid } from "process";
import { connectToDatabase } from "../database";
import { buildAssociationsBetweenSchemas } from "../database/schema";
import { Role, RoleInterface } from "../database/schema/role.schema";
import { APIController } from "./controllers";

export class Server {
  private readonly PORT = 5000 || process.env.PORT;
  private readonly workers = cpus().length;
  private app = express();

  constructor() {
    /**
     * INFO:
     * Can be enable in Production
     * But for developement
     * I think it is not required for now!!
     */
    if (isMaster) {
      console.log(`## 🔼 Master Server: ${pid} has been started...`);
      for (let i = 0; i < this.workers; i++) fork();
      on("exit", () => fork());
    } else {
      this.internalServerStart();
    }
  }

  private async internalServerStart() {
    try {
      await this.serverConfig();
      await connectToDatabase();
      await (async () => {
        buildAssociationsBetweenSchemas();
        /** Building up the UserPermissionRoles
         * Pure RoleBased Authentication
         * When ever user tries to signup - he/she will
         * directly automatically assigned to `RoleInterface.CUSTOMER` permissions
         *
         * At the beginning - we can set a `RoleInterface.SuperAdmin` permission to a 1 user
         *
         * others who else wanna sell, can be associated with`RoleInterface.SELLER` permission
         */
        Role.findOne({ where: { role: RoleInterface.CUSTOMER } }).then((m) => {
          if (m == null) {
            (async function () {
              // await Role.destroy({ truncate: true });
              await Role.create({ role: "ADMIN" });
              await Role.create({ role: "CUSTOMER" });
              await Role.create({ role: "SELLER" });
            })();
          }
        });
      })();

      this.app.use("/api", APIController);

      this.app.listen(this.PORT, () =>
        console.log(
          `[ PID:${pid} ] 🚀 Server already started on http://localhost:${this.PORT}`
        )
      );
    } catch (error) {
      console.error({ error });
    }
  }

  async serverConfig() {
    // express-fileupload setup middleware
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: `/tmp/`,
      })
    );
    this.app.use(json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(urlencoded({ extended: false }));
  }
}
