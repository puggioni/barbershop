"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* ============PRODUCTS FILES============ */
const postProducts_1 = __importDefault(require("./Products/postProducts"));
const getAllProducts_1 = __importDefault(require("./Products/getAllProducts"));
const getSearchedProducts_1 = __importDefault(require("./Products/getSearchedProducts"));
const deleteProducts_1 = __importDefault(require("./Products/deleteProducts"));
const getProduct_1 = __importDefault(require("./Products/getProduct"));
const filterProducts_1 = __importDefault(require("./Products/filterProducts"));
const editProduct_1 = __importDefault(require("./Products/editProduct"));
const postPopulateProducts_1 = __importDefault(require("./Products/postPopulateProducts"));
const addToFavorite_1 = __importDefault(require("./Products/addToFavorite"));
const removeFromFavorite_1 = __importDefault(require("./Products/removeFromFavorite"));
const getAllFavorites_1 = __importDefault(require("./Products/getAllFavorites"));
const addToFavoriteBulk_1 = __importDefault(require("./Products/addToFavoriteBulk"));
/* ============USERS FILES============ */
const signup_1 = __importDefault(require("./User/signup"));
const signin_1 = __importDefault(require("./User/signin"));
const changeToAdmin_1 = __importDefault(require("./User/changeToAdmin"));
const changeToCommon_1 = __importDefault(require("./User/changeToCommon"));
const banUser_1 = __importDefault(require("./User/banUser"));
const desbanearUser_1 = __importDefault(require("./User/desbanearUser"));
const getAllUsers_1 = __importDefault(require("./User/getAllUsers"));
const getOneUser_1 = __importDefault(require("./User/getOneUser"));
const resetPwd_1 = __importDefault(require("./User/resetPwd"));
const patchPwd_1 = __importDefault(require("./User/patchPwd"));
const editUser_1 = __importDefault(require("./User/editUser"));
/* ============CATEGORIES============ */
const postCategories_1 = __importDefault(require("./Categories/postCategories"));
const deleteCategory_1 = __importDefault(require("./Categories/deleteCategory"));
const getAllCategories_1 = __importDefault(require("./Categories/getAllCategories"));
/* ============REVIEWS============ */
const postReview_1 = __importDefault(require("./Reviews/postReview"));
const deleteReview_1 = __importDefault(require("./Reviews/deleteReview"));
const editReview_1 = __importDefault(require("./Reviews/editReview"));
/* ============APPOINTMENTS============ */
const postAppointment_1 = __importDefault(require("./Appointments/postAppointment"));
const getAppontments_1 = __importDefault(require("./Appointments/getAppontments"));
const deleteAppointment_1 = __importDefault(require("./Appointments/deleteAppointment"));
const getAllAppointments_1 = __importDefault(require("./Appointments/getAllAppointments"));
/* ============BARBERS============ */
const postbarber_1 = __importDefault(require("./Barbers/postbarber"));
const getbarbers_1 = __importDefault(require("./Barbers/getbarbers"));
/* ============OFFICES============ */
const postOffice_1 = __importDefault(require("./Offices/postOffice"));
const getOffices_1 = __importDefault(require("./Offices/getOffices"));
const patchOffice_1 = __importDefault(require("./Offices/patchOffice"));
/* ============PAYMENTS============*/
const captureOrder_1 = __importDefault(require("./Payments/captureOrder"));
const cancelOrder_1 = __importDefault(require("./Payments/cancelOrder"));
const createOrder_1 = __importDefault(require("./Payments/createOrder"));
/*============ORDERS=============*/
const getOrder_1 = __importDefault(require("./Orders/getOrder"));
const completeOrder_1 = __importDefault(require("./Orders/completeOrder"));
const cancelOrders_1 = __importDefault(require("./Orders/cancelOrders"));
const deleteAllOrders_1 = __importDefault(require("./Orders/deleteAllOrders"));
const getUserOrders_1 = __importDefault(require("./Orders/getUserOrders"));
const getPurchaseOrders_1 = __importDefault(require("./Orders/getPurchaseOrders"));
const searchOrder_1 = __importDefault(require("./Orders/searchOrder"));
const changeStateOrder_1 = __importDefault(require("./Orders/changeStateOrder"));
const filterOrders_1 = __importDefault(require("./Orders/filterOrders"));
const router = (0, express_1.Router)();
/* ============PRODUCTS============ */
router.use("/products", postProducts_1.default);
router.use("/products", getAllProducts_1.default);
router.use("/products", getSearchedProducts_1.default);
router.use("/products", getProduct_1.default);
router.use("/products", deleteProducts_1.default);
router.use("/products", filterProducts_1.default);
router.use("/products", editProduct_1.default);
router.use("/products", postPopulateProducts_1.default);
router.use("/products", addToFavorite_1.default);
router.use("/products", removeFromFavorite_1.default);
router.use("/products", getAllFavorites_1.default);
router.use("/products", addToFavoriteBulk_1.default);
/* ============USERS============ */
router.use("/users", signup_1.default);
router.use("/users", signin_1.default);
router.use("/users", getOneUser_1.default);
// router.use("/users", isAdmin);
router.use("/users", changeToAdmin_1.default);
router.use("/users", changeToCommon_1.default);
router.use("/users", banUser_1.default);
router.use("/users", desbanearUser_1.default);
router.use("/users", getAllUsers_1.default);
router.use("/users", resetPwd_1.default);
router.use("/users", patchPwd_1.default);
router.use("/users", editUser_1.default);
router.use("/users", resetPwd_1.default);
router.use("/users", patchPwd_1.default);
/* ============CATEGORIES============ */
router.use("/categories", postCategories_1.default);
router.use("/categories", getAllCategories_1.default);
router.use("/categories", deleteCategory_1.default);
/* ============REVIEWS============ */
router.use("/reviews", postReview_1.default);
router.use("/reviews", deleteReview_1.default);
router.use("/reviews", editReview_1.default);
/* ============APPOINTMENTS============ */
router.use("/agenda/", postAppointment_1.default);
router.use("/agenda/", deleteAppointment_1.default);
router.use("/agenda/", getAppontments_1.default);
router.use("/agenda/", getAllAppointments_1.default);
/* ============OFFICES============ */
router.use("/office/", postOffice_1.default);
router.use("/office/", getOffices_1.default);
router.use("/office/", patchOffice_1.default);
/* ============BARBERS============ */
router.use("/barber/", postbarber_1.default);
router.use("/barber/", getbarbers_1.default);
/* ============PAYMENTS============*/
router.use("/payments", captureOrder_1.default);
router.use("/payments", cancelOrder_1.default);
router.use("/payments", createOrder_1.default);
/*============ORDERS=============*/
router.use("/orders", getPurchaseOrders_1.default);
router.use("/orders", searchOrder_1.default);
router.use("/orders", filterOrders_1.default);
router.use("/orders", changeStateOrder_1.default);
router.use("/orders", getOrder_1.default);
router.use("/orders", completeOrder_1.default);
router.use("/orders", cancelOrders_1.default);
router.use("/orders", deleteAllOrders_1.default);
router.use("/orders", getUserOrders_1.default);
exports.default = router;
