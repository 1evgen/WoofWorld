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
        yield db.collection('dogs').insertOne(newPet);
        res.status(201).send("The animal added");
    }
    catch (err) {
        res.status(500);
    }
}));
app.put('/pet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPet = req.params.id;
    const changedDataPet = {};
    Object.keys(req.body).forEach((key) => {
        changedDataPet[key] = req.body[key];
    });
    try {
        yield db.collection('dogs').updateOne({ _id: new mongodb_1.ObjectId(idPet) }, { $set: changedDataPet });
        res.status(200).send('Animals changed success !');
    }
    catch (error) {
        res.status(500).send("Something wrong !");
    }
}));
app.delete('/pet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield db.collection('dogs').deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.status(204).send('The animal deleted');
    }
    catch (err) {
        res.status(500);
    }
}));
app.get('/sellers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellers = yield db.collection('sellers').find({}).toArray();
        res.status(200).send(sellers);
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}));
app.post("/seller", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSeller = {
        _id: new mongodb_1.ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        rating: req.body.rating,
        socialMedia: { vk: req.body.socialMedia.vk,
            telegram: req.body.telegram.socialMedia.telegram }
    };
    try {
        yield db.collection('sellers').insertOne(newSeller);
        res.status(200).send('The seller added');
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.delete('/seller/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sellerId = req.params.id;
    try {
        yield db.collection('sellers').deleteOne({ _id: new mongodb_1.ObjectId(sellerId) });
        res.status(204).send("Seller delete");
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
app.put('seller/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sellerId = req.params.id;
    let changeSeller = {};
    Object.keys(req.body).forEach((key) => {
        changeSeller[key] = req.body[key];
    });
    try {
        yield db.collection('sellers').updateOne({ _id: new mongodb_1.ObjectId(sellerId) }, { $set: changeSeller });
        res.status(200).send('change data');
    }
    catch (err) {
        res.status(500).send(err);
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
startApp();
