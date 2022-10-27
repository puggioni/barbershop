"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const officeSchema = new mongoose_1.Schema({
    lat: {
        required: true,
        type: Number,
    },
    long: {
        required: true,
        type: Number,
    },
    location: {
        required: true,
        type: String,
    }
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Office", officeSchema);
