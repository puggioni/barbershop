"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrder = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const payMethos_1 = require("./payMethos");
const products_1 = require("./products");
const user_1 = require("./user");
class PurchaseOrder {
}
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "quant_prod", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => user_1.User,
    }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => products_1.Product,
    }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "product", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => payMethos_1.PayMethods,
    }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "payMethod", void 0);
exports.PurchaseOrder = PurchaseOrder;
const PoModel = (0, typegoose_1.getModelForClass)(PurchaseOrder);
exports.default = PoModel;
