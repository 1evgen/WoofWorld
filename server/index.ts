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
     await db.collection('dogs').insertOne(newPet)
      res.status(201).send("The animal added")
} catch (err){
        res.status(500)
}})

app.put('/pet/:id',async (req: Request, res: Response)=> {
    const idPet = req.params.id
    const changedDataPet: Record<string, unknown>  = {}
    Object.keys(req.body).forEach((key)=> {
        changedDataPet[key] = req.body[key]
    })
    try {
        await db.collection('dogs').updateOne({_id: new ObjectId(idPet)}, {$set: changedDataPet})
        res.status(200).send('Animals changed success !')
    } catch (error){
            res.status(500).send("Something wrong !")
    }
})

app.delete('/pet/:id', async (req: Request, res: Response)=> {
    let id = req.params.id
    try {
        await db.collection('dogs').deleteOne({_id: new ObjectId(id)})
        res.status(204).send('The animal deleted')
    } catch (err){
        res.status(500)
    }
})

app.get('/sellers', async (req: Request, res: Response)=> {
    try{
        const sellers = await db.collection('sellers').find({}).toArray()
        res.status(200).send(sellers)
    } catch (error){
        res.status(500)
        console.log(error)
    }
})

app.post("/seller", async (req: Request, res: Response)=> {
    const newSeller: SellerI  = {
        _id: new ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        rating: req.body.rating,
        socialMedia: {vk: req.body.socialMedia.vk,
            telegram: req.body.telegram.socialMedia.telegram}
    }
    try {
        await db.collection('sellers').insertOne(newSeller)
        res.status(200).send('The seller added')
    }catch (error){
        res.status(500).send(error)
    }
})

app.delete('/seller/:id', async (req: Request, res: Response)=> {
    let sellerId = req.params.id
    try {
        await db.collection('sellers').deleteOne({_id: new ObjectId(sellerId)})
        res.status(204).send("Seller delete")
    } catch (err){
        res.status(500).send(err)
    }
 })

app.put('seller/:id', async (req: Request, res: Response)=> {
    let sellerId = req.params.id
    let changeSeller: Record<string, unknown> = {}
    Object.keys(req.body).forEach((key)=> {
        changeSeller[key] = req.body[key]
    })
    try {
        await db.collection('sellers').updateOne({_id: new ObjectId(sellerId)}, {$set: changeSeller})
        res.status(200).send('change data')
     } catch (err){
        res.status(500).send(err)
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
