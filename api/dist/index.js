"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_2 = __importDefault(require("./app"));
app_1.default.listen(app_2.default, () => {
    console.log(`server started at http://localhost:${app_2.default}`);
});
