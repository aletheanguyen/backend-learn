import bodyParser from "body-parser";
import { Db, FilterQuery } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import { app } from "../app/Express";
import { BaseModel, Status } from "../submodule/learn-backend-base/model/BaseModel";
import { Paging, QueryAndSearch } from "../submodule/learn-backend-base/model/Query";

export function controllerBuilder<T extends BaseModel>(app, db: Db, path: string, tableName: string, validationSchema: any) {

    app.post(`/${path}/list`, async function (req, res) {
        let body: QueryAndSearch<T> = req.body;
        let searchText = body.searchText || []
        let sort = body.sort || []

        // Convert body data to format of find
        let convertSearch = searchText
            .map(s => {
                let sArray = s.fields.map(i => {
                    return { [i]: new RegExp(s.text, "gi") }
                })
                return { $or: sArray }
            })
            .reduce((a, b) => Object.assign(a, b), {});

        let { page, pageSize } = req.query ? req.query : { page: 1, pageSize: 0 }

        let convertSorts = sort
            .map(s => {
                let field = s.charAt(0) != "-" ? s : s.substring(1);
                if (s.charAt(0) == "-")
                    return { [field]: -1 }
                else return { [field]: 1 }
            })
            .reduce((a, b) => Object.assign(a, b), {})

        // query to search data
        const query = db.collection(tableName).find(convertSearch);
        // query to sort data
        body && sort && query.sort(convertSorts);
        // Query to separate page data
        pageSize && page && query.skip(Number(page) > 1
            ? (Number(page) - 1) * Number(pageSize)
            : 0)
            .limit(Number(pageSize) ? Number(pageSize) : 0);
        // Query database
        let products = await query.toArray();

        // format result to return
        const totalItem = await db.collection(tableName).find(convertSearch).count(true)
        let paging: Paging<T> = {
            page: Number(page),
            pageSize: Number(pageSize),
            rows: products,
            totalPage: Math.ceil(totalItem / Number(pageSize)),
            total: totalItem
        }
        res.status(200).send(paging)
    })

    app.post(`/${path}`, function (req, res) {
        let newProduct = req.body as T
        console.log({ newProduct });

        validationSchema.validate(newProduct)
            .then(async () => {
                console.log("validation successfully");
                let getProduct = newProduct._id ? await db.collection(tableName).findOne({ _id: newProduct["_id"] }) : undefined
                newProduct = newProduct._id
                    ? { ...getProduct, ...newProduct, updatedAt: new Date() }
                    : { ...newProduct, _id: uuidv4(), createdAt: new Date(), updatedAt: new Date(), status: Status.active }
                console.log({ newProduct });

                await db.collection<T>(tableName).save(newProduct)
                    .then(async rst => {
                        await res.status(200).send(newProduct)
                    })
                    .catch(function (err) {
                        res.status(200).send(err)
                    })
            })
            .catch(function (err) {
                err.errors;
                res.status(500).send(err.errors);
            });
    })

    app.delete(`/${path}/:id`, async function (req, res) {
        let deletedItemId: string = req.params.id
        await db.collection(tableName).findOne({ _id: deletedItemId })
            .then(async (item: T) => {
                item.status == Status.active ?
                    db.collection(tableName).save({ ...item, status: Status.deleted }).then(rst => {
                        res.status(200).send({ ...item, status: Status.deleted })
                    })
                    : res.status(404).send({ message: "This item is not existed!" })
            })
            .catch(err => res.status(404).send({ message: "This item is not existed!" }))
    })
}