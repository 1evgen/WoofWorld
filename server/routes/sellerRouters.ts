import {ObjectId} from "mongodb";
import {Request, Response, Router} from "express";
import {client} from "../bd/bd";
import {validationField} from "../validator/validator";
import {validationResult} from "express-validator";
const db = client.db('DogHub')
export const sellerRouter = Router()

sellerRouter.get('/sellers', async (req: Request, res: Response)=> {
    try{
        const sellers = await db.collection('sellers').find({}).toArray()
        res.status(200).send(sellers)
    } catch (error){
        res.status(404)
        console.log(error)
    }
})
sellerRouter.post("/seller",
        validationField.checkTypesStringForField(["name","phoneNumber","location"]),
        validationField.checkTypesNumberForField(["rating"]),
    async (req: Request, res: Response)=> {
    const newSeller: SellerI  = {
        _id: new ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        rating: req.body.rating,
        socialMedia: {
            vk: req.body.socialMedia ? req.body.socialMedia.vk : "",
            telegram: req.body.socialMedia ? req.body.socialMedia.telegram : ""
        }
    };


    const error =  validationResult(newSeller)
    if(error.isEmpty()){
        try {
            await db.collection('sellers').insertOne(newSeller)
            res.status(200).send('The seller added')
        }catch (error){
            res.status(404).send(error)
        }
    } else {
        res.status(400).send({errors: error.array()})
    }

})
sellerRouter.delete('/seller/:id', async (req: Request, res: Response)=> {
    let sellerId = req.params.id
    try {
        await db.collection('sellers').deleteOne({_id: new ObjectId(sellerId)})
        res.status(204).send("Seller delete")
    } catch (err){
        res.status(500).send(err)
    }
})

sellerRouter.put('/seller/:id', async (req: Request, res: Response)=> {
    let sellerId = req.params.id
    let changeSeller: Record<string, unknown> = {}
    Object.keys(req.body).forEach((key)=> {
        changeSeller[key] = req.body[key]
    })
    try {
        await db.collection('sellers').updateOne({_id: new ObjectId(sellerId)}, {$set: changeSeller})
        res.status(200).send('change data')
    } catch (err){
        res.status(404).send(err)
    }
})

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
