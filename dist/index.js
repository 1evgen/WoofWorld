"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bd_1 = require("./bd/bd");
const express = require("express");
const mongodb_1 = require("mongodb");
const app = express();
const PORT = process.env.PORT || "3003";
app.use(express.json());
const db = bd_1.client.db('DogHub');
app.get('/allDogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dogs = yield db.collection('dogs').find({}).toArray();
    res.status(200).send(dogs);
}));
app.post('/pet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPet = {
        _id: new mongodb_1.ObjectId(),
        breed: req.body.breed,
        name: req.body.name,
        ageMonth: req.body.age,
        gender: req.body.gender,
        price: req.body.price,
        description: req.body.description,
        additionalInfo: req.body.additionalInfo,
        photos: ['ch.jpg'],
        sellerId: req.body.sellerId
    };
    try {
        let addNewPet = yield db.collection('newPet').insertOne(newPet);
        res.status(200).send(addNewPet);
    }
    catch (err) {
        res.status(500);
    }
}));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, bd_1.runDb)();
        app.listen(PORT, () => {
            console.log(`The server started success ! Port - ${PORT}`);
        });
    }
    catch (_a) {
        console.log('error');
    }
});
app.get('/sellers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellers = yield db.collection('seller').find({}).toArray();
        res.status(200).send(sellers);
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}));
startApp();
