import { app } from "../app/Express";
import { db } from "../database/MongoConnector";
import { controllerBuilder } from "./ControllerBuilder";
import { Account, accountSchema } from "../submodule/learn-backend-base/model/Account";

controllerBuilder<Account>(app, db, 'account', 'account', accountSchema)
