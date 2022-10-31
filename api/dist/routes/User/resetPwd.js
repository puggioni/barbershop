"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = __importDefault(require("../../models/user"));
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const router = (0, express_1.Router)();
router.get("/pwdRst/sendEmail/:usrEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usrEmail } = req.params;
    try {
        user_1.default.findOne({ email: usrEmail })
            .then(user => {
            const options = {
                method: 'post',
                url: 'https://api.sendinblue.com/v3/smtp/email',
                data: {
                    "sender": {
                        "name": "Grupo Barbershop",
                        "email": "grupo7henry@gmail.com"
                    },
                    "to": [
                        {
                            "email": `${user.email}`,
                            "name": `${user.name}`
                        }
                    ],
                    "subject": "Password Reset",
                    "htmlContent": `<html>
              <head></head>
                <h1>Henry Barbershop</h1>
                <body>
                  <p>Un reseteo de contraseña fue pedido para esta cuenta,</p>
                  <p>si fue asi hace click en el siguiente boton, sino ignora este email.</p>
                  <p>
                  <button type="button"><a href="${process.env.CLIENT_URL}/passwordReset/${user._id}">Reset Password</a></button>
                  </p>
                </body>
            </html>`
                },
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'api-key': `${process.env.SENDINBLUE_API_KEY}`
                }
            };
            return (0, axios_1.default)(options);
        })
            .then(mailServerRes => {
            console.log(mailServerRes);
            res.status(200).send("Success");
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = router;
