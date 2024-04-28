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
exports.sellerRouter = void 0;
const mongodb_1 = require("mongodb");
const express_1 = require("express");
const bd_1 = require("../bd/bd");
const db = bd_1.client.db('DogHub');
exports.sellerRouter = (0, express_1.Router)();
exports.sellerRouter.get('/sellers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellers = yield db.collection('sellers').find({}).toArray();
        res.status(200).send(sellers);
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}));
exports.sellerRouter.post("/seller", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSeller = {
        _id: new mongodb_1.ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        rating: req.body.rating,
        socialMedia: {
            vk: req.body.socialMedia ? req.body.socialMedia.vk : "",
            telegram: req.body.socialMedia ? req.body.socialMedia.telegram : ""
        }
    };
    try {
        yield db.collection('sellers').insertOne(newSeller);
        res.status(200).send('The seller added');
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.sellerRouter.delete('/seller/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sellerId = req.params.id;
    try {
        yield db.collection('sellers').deleteOne({ _id: new mongodb_1.ObjectId(sellerId) });
        res.status(204).send("Seller delete");
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.sellerRouter.put('/seller/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
