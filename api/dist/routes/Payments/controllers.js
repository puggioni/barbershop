"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.captureOrder = exports.createOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const PAYPAL_API = process.env.PAYPAL_API;
const CLIENT = process.env.CLIENT;
const SECRET = process.env.SECRET;
const createOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: "333" },
          description: "VENTA",
        },
      ],
      application_context: { brand_name: "Henry BarberShop" },
      landing_page: "NO PREFERENCE",
      user_action: "PAY_NOW",
<<<<<<< HEAD
      return_url: "https://localhost:5000/payments/capture-order",
      cancel_url: "https://localhost:5000/payments/cancel-order",
=======
      return_url: "http://localhost:5000/payments/capture-order",
      cancel_url: "http://localhost:5000/payments/cancel-order",
>>>>>>> 60d924f893ed2a447f1cd8c86a9c142f6b115b20
    };
    const response = yield axios_1.default.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        auth: { username: CLIENT, password: SECRET },
      }
    );
  });
exports.createOrder = createOrder;
const captureOrder = (req, res) => {
  res.send("capturing order");
};
exports.captureOrder = captureOrder;
const cancelOrder = (req, res) => {
  res.send("cancel an order");
};
exports.cancelOrder = cancelOrder;
