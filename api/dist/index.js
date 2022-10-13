"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
//=======CONNECT TO SERVER=======//
app_1.default.listen(process.env.PORT, () => {
    console.log(`Successfully started the server, listening on port: ${process.env.PORT}`);
});
//=======CONNECT TO MONGO=======//
const db_1 = require("./db");
mongoose_1.default
    .connect(db_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(() => {
    console.log("Started the database");
})
    .catch((err) => {
    console.log(err);
});
