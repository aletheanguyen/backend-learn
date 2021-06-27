export interface IConfig {
    mongo: {
        uri: string,
        dbName: string
    }
}

const localConf: IConfig = {
    mongo: {
        uri: 'mongodb://localhost:37017',
        dbName: 'hai-test-backend'
    }
}
const devConf: IConfig = {
    mongo: {
        uri: 'mongodb://localhost:37017',
        dbName: 'hai-test-backend'
    }
}

const prodConf: IConfig = {
    mongo: {
        uri: 'mongodb://localhost:37017',
        dbName: 'hai-test-backend'
    }
}

console.log(`load config for env is [${process.env.NODE_ENV}]`);
export const config = process.env.NODE_ENV == 'prod' ? prodConf
    : process.env.NODE_ENV == 'dev' ? devConf
        : localConf