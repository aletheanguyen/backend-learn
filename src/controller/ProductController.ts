import { app } from "../app/Express";
import { db } from "../database/MongoConnector";
import { Product, productSchema } from "../submodule/learn-backend-base/model/Product";
import { controllerBuilder } from "./ControllerBuilder";

controllerBuilder<Product>(app, db, 'product', 'product', productSchema)
