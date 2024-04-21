import {MongoClient} from "mongodb";
let MongoUri = process.env.MongoUri || "mongodb://127.0.0.1:27017/DogHub"

export const client = new MongoClient(MongoUri)

export async function runDb(){
    try {
        await client.connect()
        console.log('BD is running')
    }catch {
        await client.close()
        console.log('bd falling!')
    }
}


