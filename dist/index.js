"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express_1 = require("./app/Express");
var MongoConnector_1 = require("./database/MongoConnector");
var require_dir_1 = __importDefault(require("require-dir"));
var Config_1 = require("./config/Config");
MongoConnector_1.connectMongo(Config_1.config.mongo.uri, Config_1.config.mongo.dbName, function (db) {
    Express_1.app.listen(3001);
    require_dir_1.default("./controller");
});
