import {Request, Response, Router} from "express";
import {ObjectId} from "mongodb";
import {client} from "../bd/bd";
import {validationResult} from "express-validator";
import {fields, validationField} from "../validator/validator";
export const dogRouter = Router()
const db = client.db('DogHub')

dogRouter.post('/pet',
    validationField.checkTypesStringForField(fields),
    validationField.checkTypesNumberForField(["price","ageMonth"]),
    async (req: Request, res: Response)=> {
    const errors = validationResult(req);
    const sellerId = new ObjectId(req.body.sellerId)
        if (!errors.isEmpty()){
            res.status(400).send({ errors: errors.array() })
        } else {
            const newPet: DogI = {
                _id: new ObjectId(),
                breed: req.body.breed,
                name: req.body.name,
                ageMonth: req.body.ageMonth,
                gender: req.body.gender,
                price: req.body.price,
                description: req.body.description,
                additionalInfo: req.body.additionalInfo,
                photos: ['ch.jpg'],
                sellerId: sellerId
            }
            try {
                await db.collection('dogs').insertOne(newPet)
                res.status(201).send(`${typeof req.body.name}`)
            } catch (err){
                res.status(500) // fix status code
            }
        }
})


dogRouter.get('/allPets',
    async (req: Request, res: Response) =>
    {
        const dogs = await db.collection('dogs').find({}).toArray()
        res.status(200).send(dogs)
    })

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
