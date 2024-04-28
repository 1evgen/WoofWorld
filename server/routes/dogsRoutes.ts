import {Request, Response, Router} from "express";
import {ObjectId} from "mongodb";
import {client} from "../bd/bd";


 export const dogRouter = Router()
const db = client.db('DogHub')

dogRouter.get('/allPets', async (req: Request, res: Response) => {
    const dogs = await db.collection('dogs').find({}).toArray()
    res.status(200).send(dogs)
})

dogRouter.post('/pet', async (req: Request, res: Response)=> {
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

dogRouter.put('/pet/:id',async (req: Request, res: Response)=> {
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

dogRouter.delete('/pet/:id', async (req: Request, res: Response)=> {
    let id = req.params.id
    try {
        await db.collection('dogs').deleteOne({_id: new ObjectId(id)})
        res.status(204).send('The animal deleted')
    } catch (err){
        res.status(500)
    }
})

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
