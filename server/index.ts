import {client, runDb} from "./bd/bd";
const express = require("express")
import {Request, Response} from "express";
import {ObjectId} from "mongodb";


const app = express()
const PORT = process.env.PORT || "3003"
app.use(express.json());
const db = client.db('DogHub')

app.get('/allDogs', async (req: Request, res: Response) => {
    const dogs = await db.collection('dogs').find({}).toArray()
    res.status(200).send(dogs)
})



app.post('/pet', async (req: Request, res: Response)=> {
    const newPet: DogI = {
        _id: new ObjectId(),
        breed: req.body.breed,
        name: req.body.name,
        ageMonth: req.body.age,
        gender: req.body.gender,
        price: req.body.price,
        description: req.body.description,
        additionalInfo: req.body.additionalInfo,
        photos: ['ch.jpg'],
        sellerId: req.body.sellerId
    }
try {
    let addNewPet = await db.collection('newPet').insertOne(newPet)
    res.status(200).send(addNewPet)
} catch (err){
        res.status(500)
}
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

app.get('/sellers', async (req: Request, res: Response)=> {
    try{
        const sellers = await db.collection('seller').find({}).toArray()
        res.status(200).send(sellers)
    } catch (error){
        res.status(500)
        console.log(error)
    }
})

startApp()

interface DogI {
    _id: ObjectId,
    breed: string,
    ageMonth: number,
    gender: string,
    name: string,
    price: number,
    description: string,
    additionalInfo: string,
    photos: Array<string>
    sellerId: ObjectId
}

interface SellerI {
    _id: ObjectId,
    name: string,
    phoneNumber: string,
    socialMedia: {
        vk: string,
        telegram: string
    },
    rating: number,
    location: string
}
