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
exports.googleOauthHandler = exports.isAdmin = exports.isCommon = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const googleAuth_1 = require("./googleAuth");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["x-access-token"];
        if (!token)
            return res.status(403).json({ message: "No hay token" });
        const decoded = jsonwebtoken_1.default.verify(token, "token");
        req.userId = decoded["_id"];
        const user = yield user_1.default.findById(req.userId, { password: 0 });
        console.log(user);
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
    const user = yield user_1.default.findById(req.userId);
    const roles = yield role_1.default.find({ _id: { $in: user.role } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requiere ser moderador" });
});
exports.isCommon = isCommon;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.userId);
    const roles = yield role_1.default.find({ _id: { $in: user === null || user === void 0 ? void 0 : user.role } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ isAdmin: false });
});
exports.isAdmin = isAdmin;
const googleOauthHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //codigo desde qs
    const code = req.query.code;
    try {
        //obtenemos el id y token de acceso de google
        const { id_token, access_token } = yield (0, googleAuth_1.getGoogleOAuthTokens)({ code });
        //obtenemos el usuario con los tokens
        const googleUser = yield (0, googleAuth_1.getGoogleUser)({ id_token, access_token });
        //verificamos si el usuario existe en la base de datos
        const user = yield user_1.default.findOne({ email: googleUser.email });
        //si no existe lo creamos
        if (!user) {
            const newUser = new user_1.default({
                name: googleUser.name,
                email: googleUser.email,
                password: "google",
            });
            yield newUser.save();
        }
        //creamos el token
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, "token", {
            expiresIn: 60 * 60 * 24,
        });
        const response = {
            user,
            token,
        };
        //enviamos el token
        res.header("auth-token", token).send(response);
    }
    catch (error) { }
});
exports.googleOauthHandler = googleOauthHandler;
