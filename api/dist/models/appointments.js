"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        default: Date.now
        /* validate: function(input) {
            return new Date(input) >= new Date();
        },
        message: input => `${input} must be greater than or equal to the current date!` */
    },
    block: { required: true, type: Number, min: 1, max: 4 },
    barber: { type: mongoose_1.Types.ObjectId, ref: 'Barber' },
    office: { type: mongoose_1.Types.ObjectId, ref: 'Office' }
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("Appointment", appointmentSchema);
