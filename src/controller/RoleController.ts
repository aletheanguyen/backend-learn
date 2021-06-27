import { BaseModel } from "../submodule/learn-backend-base/model/BaseModel";

export interface Role extends BaseModel {
    key: string,
    name?: string,
    apiURLs?: string[]
}