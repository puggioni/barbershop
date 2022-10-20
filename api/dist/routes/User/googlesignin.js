"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../../middlewares/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/api/sessions/oauth/google", auth_1.googleOauthHandler);
exports.default = router;
