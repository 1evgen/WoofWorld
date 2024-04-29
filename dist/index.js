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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bd_1 = require("./bd/bd");
const dogsRoutes_1 = require("./routes/dogsRoutes");
const sellerRouters_1 = require("./routes/sellerRouters");
const body_parser_1 = __importDefault(require("body-parser"));
const express = require("express");
const app = express();
const PORT = process.env.PORT || "3003";
app.use(express.json());
app.use('/dogs', dogsRoutes_1.dogRouter);
app.use('/clients', sellerRouters_1.sellerRouter);
app.use((0, body_parser_1.default)());
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
