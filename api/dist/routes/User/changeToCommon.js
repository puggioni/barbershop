"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const user_1 = __importDefault(require("../../models/user"));
const role_1 = __importDefault(require("../../models/role"));
const router = (0, express_1.Router)();
router.patch("/changeToCommon/:id", auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const user = yield user_1.default.findById(id);
        const roleFound = yield role_1.default.findOne({ name: role });
        user["role"][0] = roleFound["_id"];
        console.log("🚀 ~ file: changeToCommon.ts ~ line 14 ~ router.patch ~ user", user);
        res.status(200).send("User updated");
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.default = router;
