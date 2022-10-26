"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        required: true, //la validacion de fecha se hace en la ruta
    },
    block: { required: true, type: Number, min: 1, max: 8 },
    barber: { type: mongoose_1.Types.ObjectId, ref: 'Barber' },
    office: { type: mongoose_1.Types.ObjectId, ref: 'Office' },
    service: [String]
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Appointment", appointmentSchema);
