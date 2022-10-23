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
exports.isAdmin = exports.isCommon = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["token"];
        if (!token)
            return res.status(403).json({ message: "No hay token" });
        const decoded = jsonwebtoken_1.default.verify(token, "token");
        req.userId = decoded["_id"];
        const user = yield user_1.default.findById(req.userId, { password: 0 });
        if (!user)
            return res.status(404).json({ message: "No se encontro ningun usuario" });
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "No Autorizado!" });
    }
});
exports.verifyToken = verifyToken;
const isCommon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["token"];
    if (!token)
        return res.status(403).json({ message: "No hay token" });
    const decoded = jsonwebtoken_1.default.verify(token, "token");
    req.userId = decoded["_id"];
    const user = yield user_1.default.findById(req.userId);
    const roles = yield role_1.default.find({ _id: { $in: user.role } });
    if (roles[0].name === "user") {
        next();
        return;
    }
    return res.status(403).json({ message: "Requiere ser moderador" });
});
exports.isCommon = isCommon;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["token"];
    if (!token)
        return res.status(403).json({ message: "No hay token" });
    const decoded = jsonwebtoken_1.default.verify(token, "token");
    console.log(decoded);
    req.userId = decoded["_id"];
    const user = yield user_1.default.findById(req.userId);
    const roles = yield role_1.default.find({ _id: { $in: user === null || user === void 0 ? void 0 : user.role } });
    if (roles[0].name === "admin") {
        next();
        return;
    }
    return res.status(403).json({ isAdmin: false });
});
exports.isAdmin = isAdmin;
