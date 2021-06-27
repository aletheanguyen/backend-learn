import { Db, MongoClient } from "mongodb"
const assert = require('assert');

export let db: Db;
export const connectMongo = (uri: string, dbName: string, callBack: (db: Db) => void) => {
    const client = new MongoClient(uri);
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Connected successfully to DB');
        db = client.db(dbName);
        callBack(db)
    });
}