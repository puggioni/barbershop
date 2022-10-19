"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/set-cookies", (req, res) => {
    res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    res.send("You got the cookie");
});
router.get("/read-cookies", (req, res) => {
    const cookies = req.cookies;
    res.json(cookies);
});
exports.default = router;
