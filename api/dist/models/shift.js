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
exports.Shift = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const barber_1 = require("./barber");
const office_1 = require("./office");
const services_1 = require("./services");
const user_1 = require("./user");
class Shift {
}
__decorate([
    (0, typegoose_1.prop)({
        ref: () => user_1.User,
    }),
    __metadata("design:type", Object)
], Shift.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => barber_1.Barber,
    }),
    __metadata("design:type", Object)
], Shift.prototype, "barber", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => office_1.Office,
    }),
    __metadata("design:type", Object)
], Shift.prototype, "office", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => services_1.Services,
    }),
    __metadata("design:type", Object)
], Shift.prototype, "services", void 0);
exports.Shift = Shift;
const ShiftModel = (0, typegoose_1.getModelForClass)(Shift);
exports.default = ShiftModel;
