import { Router } from "express";
/* ============PRODUCTS FILES============ */
import postProducts from "./Products/postProducts";
import getAllProducts from "./Products/getAllProducts";
import getSearchedProducts from "./Products/getSearchedProducts";
import deleteProducts from "./Products/deleteProducts";
import getProduct from "./Products/getProduct";
import filterProducts from "./Products/filterProducts";
import editProducts from "./Products/editProduct";
import populatedProducts from "./Products/postPopulateProducts";
import addToFavorite from "./Products/addToFavorite";
import removeFromFavorite from "./Products/removeFromFavorite";
import getAllFavorites from "./Products/getAllFavorites";
/* ============USERS FILES============ */
import signUp from "./User/signup";
import login from "./User/signin";
import changeToAdmin from "./User/changeToAdmin";
import { isAdmin } from "../middlewares/auth";
import changeToCommon from "./User/changeToCommon";
import banUser from "./User/banUser";
import desbanearUser from "./User/desbanearUser";
/* ============CATEGORIES============ */
import postCategories from "./Categories/postCategories";
import deleteCategory from "./Categories/deleteCategory";
import getCategories from "./Categories/getAllCategories";
/* ============REVIEWS============ */
import postReview from "./Reviews/postReview";
import deleteReview from "./Reviews/deleteReview";
import editReview from "./Reviews/editReview";
/* ============APPOINTMENTS============ */
import postAppointment from "./Appointments/postAppointment";
import getAppointments from "./Appointments/getAppontments";
import deleteAppointment from "./Appointments/deleteAppointment";
/* ============OFFICES============ */
import postbarber from "./Barbers/postbarber";
import getbarbers from "./Barbers/getbarbers";
/* ============BARBERS============ */
import postOffice from "./Offices/postOffice";
import getOffices from "./Offices/getOffices";
/* ============PAYMENTS============*/
import Paypal from "./Payments/Paypal";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getAllProducts);
router.use("/products", getSearchedProducts);
router.use("/products", getProduct);
router.use("/products", deleteProducts);
router.use("/products", filterProducts);
router.use("/products", editProducts);
router.use("/products", populatedProducts);
router.use("/products", addToFavorite);
router.use("/products", removeFromFavorite);
router.use("/products", getAllFavorites);
/* ============USERS============ */
router.use("/users", signUp);
router.use("/users", login);
router.use("/users", isAdmin);
router.use("/users", changeToAdmin);
router.use("/users", changeToCommon);
router.use("/users", banUser);
router.use("/users", desbanearUser);
/* ============CATEGORIES============ */
router.use("/categories", postCategories);
router.use("/categories", deleteCategory);
router.use("/categories", getCategories);

/* ============REVIEWS============ */
router.use("/reviews", postReview);
router.use("/reviews", deleteReview);
router.use("/reviews", editReview);

/* ============APPOINTMENTS============ */
router.use("/agenda/", postAppointment);
router.use("/agenda/", deleteAppointment);
router.use("/agenda/", getAppointments);

/* ============OFFICES============ */
router.use("/office/", postOffice);
router.use("/office/", getOffices);

/* ============BARBERS============ */
router.use("/barber/", postbarber);
router.use("/barber/", getbarbers);

/* ============PAYMENTS============*/ 
router.use("/payments", Paypal);

export default router;
