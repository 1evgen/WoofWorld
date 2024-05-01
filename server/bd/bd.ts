import {MongoClient} from "mongodb";
const { GridFsStorage } = require("multer-gridfs-storage")
const multer = require("multer")
require("dotenv").config()
export let MongoUri = process.env.MongoUri || "mongodb://127.0.0.1:27017/DogHub"
export const client = new MongoClient(MongoUri)


const storage = new GridFsStorage({
    url: MongoUri,
    file: (req: Request, file: Express.Multer.File) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}_${file.originalname}`,
            }
        } else {
            return `${Date.now()}_${file.originalname}`
        }
    },
})
export const upload = multer({ storage })


export async function runDb(){
    try {
        await client.connect()
        console.log('BD is running')
    }catch {
        await client.close()
        console.log('bd falling!')
    }
}


