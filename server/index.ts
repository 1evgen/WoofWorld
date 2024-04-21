import {client, runDb} from "./bd/bd";
const express = require("express")
import {Request, Response} from "express";
import {ObjectId} from "mongodb";


const app = express()
const PORT = process.env.PORT || "3003"
app.use(express.json());
const db = client.db('DogHub')

app.get('/infoDogs', async (req: Request, res: Response) => {
    const products = await db.collection('dogs').find({}).toArray()
    res.status(200).send(products)
})


const startApp = async () => {
    try {
        await runDb()
        app.listen(PORT, ()=> {
            console.log(`The server started success ! Port - ${PORT}`)
        })
    } catch {
        console.log('error')
    }
}

startApp()