import { fork, isMaster } from "cluster";
import cors from "cors";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { cpus } from "os";
import { pid } from "process";
import { connectToDatabase } from "../database";
import { buildAssociationsBetweenSchemas } from "../database/schema";
import { Role, RoleInterface } from "../database/schema/role.schema";
import { APIController } from "./controllers";
const PORT = 5000 || process.env.PORT;

const app = express();

/**
 * A Worker object contains all public information and method about a worker. In the master it can be obtained using cluster.workers. In a worker it can be obtained using cluster.worker
 *
 * Server will spawn up new Instances depending upon the core of the host machine.
 *
 * For Development my machine 4cores and concurrency level 100 SET
 */
export function kickStartTheServer() {
  /**
   * INFO:
   * Can be enable in Production
   * But for developement
   * I think it is not required for now!!
   */

  // if (isMaster) {
  //   console.log(`## 🔼 Master Server: ${pid} has been started...`);
  //   for (const cpu of cpus()) {
  //     fork();
  //   }
  // } else {
  //   internalServerStart();
  // }

  internalServerStart();
}

async function internalServerStart() {
  try {
    await serverConfig();
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

    app.use("/api", APIController);

    app.listen(PORT, () =>
      console.log(
        `[ PID:${pid} ] 🚀 Server already started on http://localhost:${PORT}`
      )
    );
  } catch (error) {
    console.error({ error });
  }
}

async function serverConfig() {
  // express-fileupload setup middleware
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: `/tmp/`,
    })
  );
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(urlencoded({ extended: false }));
}
