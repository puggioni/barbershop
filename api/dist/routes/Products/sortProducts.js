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
const express_1 = require("express");
const products_1 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.get("/sort", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const arrayQuery = [];
    for (let property in query) {
        if (property === "stock" || property === "price") {
            arrayQuery.push({ [property]: Number(query[property]) });
        }
        else {
            arrayQuery.push({ [property]: query[property] });
        }
    }
    const products = yield products_1.default.find().populate("categories", "name");
    try {
        let respuesta = products;
        if (arrayQuery.length === 0) {
            res.status(200).send(respuesta);
        }
        else {
            arrayQuery.forEach((obj) => {
                if (Object.keys(obj)[0] === "price-asc") {
                    respuesta = respuesta.sort((a, b) => {
                        return a["price"] - b["price"];
                    });
                }
                if (Object.keys(obj)[0] === "price-desc") {
                    respuesta = respuesta.sort((a, b) => {
                        return b["price"] - a["price"];
                    });
                }
                if (Object.keys(obj)[0] === "name-asc") {
                    respuesta = respuesta.sort((a, b) => {
                        return a["name"].localeCompare(b["name"]);
                    });
                }
                if (Object.keys(obj)[0] === "name-desc") {
                    respuesta = respuesta.sort((a, b) => {
                        return b["name"].localeCompare(a["name"]);
                    });
                }
                if (Object.keys(obj)[0] === "price") {
                    respuesta = respuesta.filter((el) => {
                        return el["price"] >= Object.values(obj)[0];
                    });
                }
                if (Object.keys(obj)[0] === "available") {
                    respuesta = respuesta.filter((el) => {
                        return (el["available"] = Object.values(obj)[0]);
                    });
                }
            });
            res.status(200).send(respuesta);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
