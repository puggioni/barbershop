"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
//CONFIGURACION DE RUTAS
app.use("/", index_1.default);
app.use((0, cors_1.default)());
app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({ message });
});
exports.default = app;
