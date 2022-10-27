import nodemailer from "nodemailer";
import xoauth2 from "xoauth2";
const GOOGLE_ACCOUNT = process.env.GOOGLE_ACCOUNT;
const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: "grupo7henry@gmail.com",
      clientId:
        "680444537990-o1nshrda5u3hn3s2av5a9ikelo8dtktq.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "",
    }),
  },
});
