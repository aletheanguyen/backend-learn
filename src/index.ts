import { app } from "./app/Express";
import { connectMongo } from "./database/MongoConnector";
import requireDir from 'require-dir'
import { config } from "./config/Config";


connectMongo(config.mongo.uri, config.mongo.dbName, (db) => {
    app.listen(3001)
    requireDir("./controller")
})