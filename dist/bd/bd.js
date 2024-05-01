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
exports.runDb = exports.upload = exports.client = exports.MongoUri = void 0;
const mongodb_1 = require("mongodb");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
require("dotenv").config();
exports.MongoUri = process.env.MongoUri || "mongodb://127.0.0.1:27017/DogHub";
exports.client = new mongodb_1.MongoClient(exports.MongoUri);
const storage = new GridFsStorage({
    url: exports.MongoUri,
    file: (req, file) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}_${file.originalname}`,
            };
        }
        else {
            return `${Date.now()}_${file.originalname}`;
        }
    },
});
exports.upload = multer({ storage });
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            console.log('BD is running');
        }
        catch (_a) {
            yield exports.client.close();
            console.log('bd falling!');
        }
    });
}
exports.runDb = runDb;
