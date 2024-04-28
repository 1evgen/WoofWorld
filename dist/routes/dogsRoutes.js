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
exports.dogRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const bd_1 = require("../bd/bd");
exports.dogRouter = (0, express_1.Router)();
const db = bd_1.client.db('DogHub');
exports.dogRouter.get('/allPets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dogs = yield db.collection('dogs').find({}).toArray();
    res.status(200).send(dogs);
}));
exports.dogRouter.post('/pet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.dogRouter.put('/pet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.dogRouter.delete('/pet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield db.collection('dogs').deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.status(204).send('The animal deleted');
    }
    catch (err) {
        res.status(500);
    }
}));
