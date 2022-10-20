"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommon = exports.isAdmin = void 0;
const auth_1 = require("./auth");
Object.defineProperty(exports, "isAdmin", { enumerable: true, get: function () { return auth_1.isAdmin; } });
Object.defineProperty(exports, "isCommon", { enumerable: true, get: function () { return auth_1.isCommon; } });
