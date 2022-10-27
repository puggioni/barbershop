"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const xoauth2_1 = __importDefault(require("xoauth2"));
const GOOGLE_ACCOUNT = process.env.GOOGLE_ACCOUNT;
const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        xoauth2: xoauth2_1.default.createXOAuth2Generator({
            user: "grupo7henry@gmail.com",
            clientId: "680444537990-o1nshrda5u3hn3s2av5a9ikelo8dtktq.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "",
        }),
    },
});
