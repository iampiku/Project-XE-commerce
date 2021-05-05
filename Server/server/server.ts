import cors from "cors";
import express , {json , urlencoded} from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import {cpus} from "os";
import {pid} from "process";
import {connectToDatabase} from "../database";
import {buildAssociationsBetweenSchemas , User} from "../database/schema";
import {Role , RoleInterface} from "../database/schema/role.schema";
import {APIController} from "./controllers";

export class Server {
    private readonly PORT = 5000 || process.env.PORT;
    private readonly workers = cpus ().length;
    private app = express ();

    constructor() {
        /**
         * INFO:
         * Can be enable in Production
         * But for development
         * I think it is not required for now!!
         */
        // if (isMaster) {
        //   console.log(`## 🔼 Master Server: ${pid} has been started...`);
        //   for (let i = 0; i < this.workers; i++) fork();
        //   on("exit", () => fork());
        // } else {
        //   this.internalServerStart();
        // }
        this.internalServerStart ();
    }

    private async serverConfig() {
        debugger
        // express-file-upload setup middleware
        this.app.use (
            fileUpload ( {
                useTempFiles : true ,
                tempFileDir : `/tmp/` ,
            } )
        );
        this.app.use ( json () );
        this.app.use ( cors () );
        this.app.use ( morgan ( "dev" ) );
        this.app.use ( urlencoded ( { extended : false } ) );
    }

    private async internalServerStart() {
        try {
            await this.serverConfig ();
            await connectToDatabase ();
            await ( async () => {
                await buildAssociationsBetweenSchemas ();
                /** Building up the UserPermissionRoles
                 * Pure RoleBased Authentication
                 * When ever user tries to signup - he/she will
                 * directly automatically assigned to `RoleInterface.CUSTOMER` permissions
                 *
                 * At the beginning - we can set a `RoleInterface.SuperAdmin` permission to a 1 user
                 *
                 * others who else wanna sell, can be associated with`RoleInterface.SELLER` permission
                 */
                await Role.findOne ({where :{role :RoleInterface.CUSTOMER}}).then ((m) => {
                    if (m == null) {
                        (async function () {
                            // await Role.destroy({ truncate: true });
                            await Role.create ({role :"ADMIN"});
                            await Role.create ({role :"CUSTOMER"});
                            await Role.create ({role :"SELLER"});
                        }) ();
                    }
                });
            }) ();

            await this.createAdminUserIfNotExists ();

            this.app.use ( "/api" , APIController );

            this.app.listen ( this.PORT , () =>
                console.log (
                    `[ PID:${pid} ] 🚀 Server already started on http://localhost:${this.PORT}`
                )
            );
        } catch (error) {
            console.error ( { error } );
        }
    }

    private async createAdminUserIfNotExists() {
        /** Creating Admin User OneTime */
        try {
            await Role.findOne ( { where : { role : RoleInterface.ADMIN } } ).then ( async ( m ) => {
                if ( m !== null ) {
                    console.log ( { roleAdminId : ( m as any ).dataValues.id } )
                    const isAdminPresent = await User.findOne ( {
                        where : {
                            username : 'ironman@work' ,
                            email : 'admin@ecommercex.com' ,
                        }
                    } );
                    if ( isAdminPresent === null )
                        await User.create ( {
                            username : 'ironman@work' ,
                            password : '1234' ,
                            name : 'ADMIN' ,
                            email : 'admin@ecommercex.com' ,
                            roleId : ( m as any ).dataValues.id
                        } );
                }
            } )
            console.log ( `\n### Admin User is settled up with email: ironman@work` );
        } catch (e) {
            console.error ( e )
        }
    }
}
