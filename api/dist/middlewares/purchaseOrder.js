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
exports.purchaseOrder = void 0;
const products_1 = __importDefault(require("../models/products"));
const user_1 = __importDefault(require("../models/user"));
const purchaseOrder_1 = __importDefault(require("../models/purchaseOrder"));
const purchaseOrder = (user, products, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_1.default.findById(user["id"]);
    products.reduce((acc, obj) => __awaiter(void 0, void 0, void 0, function* () {
        const producto = yield products_1.default.findById(obj["productos"]["_id"]);
        userFound.purchases.push(producto);
        producto.purchases.push(userFound);
        const purchaseOrder = new purchaseOrder_1.default({
            user: userFound["_id"],
            products: {
                id: producto["_id"],
            },
        });
        yield purchaseOrder.save();
        yield producto.save();
        yield userFound.save();
    }));
    next();
});
exports.purchaseOrder = purchaseOrder;
