"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/cancel-order", (req, res) => {
    res.redirect("htpp://localhost:5000/product");
});
exports.default = router;
