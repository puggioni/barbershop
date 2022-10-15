"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriesSchema = new mongoose_1.Schema({ name: { type: String } }, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Categories", categoriesSchema);
