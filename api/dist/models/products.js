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
exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Category {
}
__decorate([
    (0, typegoose_1.prop)({
        required: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
class Product {
}
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({
        default: 0,
        type: Number,
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "available", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "favorite", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: () => [Category],
    }),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
exports.Product = Product;
const ProductModel = (0, typegoose_1.getModelForClass)(Product);
exports.default = ProductModel;
