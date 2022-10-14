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
exports.Barber = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
class Comment {
}
__decorate([
    (0, typegoose_1.prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => user_1.User,
    }),
    __metadata("design:type", Object)
], Comment.prototype, "user", void 0);
class Barber {
}
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true,
        type: String,
    }),
    __metadata("design:type", String)
], Barber.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Barber.prototype, "shift", void 0);
exports.Barber = Barber;
const BarberModel = (0, typegoose_1.getModelForClass)(Barber);
exports.default = BarberModel;
