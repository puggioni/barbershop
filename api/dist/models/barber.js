"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const barberSchema = new mongoose_1.Schema({
    name: { required: true, type: String },
    office: { type: mongoose_1.Types.ObjectId, ref: 'Office' },
    rating: { required: true, type: Number, default: 0 },
    image: { type: String, default: "" }
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Barber", barberSchema);
