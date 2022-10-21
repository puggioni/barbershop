import jwt from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return res.status(403).json({ message: "No hay token" });
    const decoded = jwt.verify(token, "token");
    console.log(decoded);
    req.userId = decoded["_id"];
    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user)
      return res.status(404).json({ message: "No se encontro ningun usuario" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "No Autorizado!" });
  }
};

export const isCommon = async (req, res, next) => {
  const token = req.headers["token"];
  if (!token) return res.status(403).json({ message: "No hay token" });
  const decoded = jwt.verify(token, "token");
  console.log(decoded);
  req.userId = decoded["_id"];
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.role } });

  if (roles[0].name === "user") {
    next();
    return;
  }
  return res.status(403).json({ message: "Requiere ser moderador" });
};

export const isAdmin = async (req, res, next) => {
  const token = req.headers["token"];
  if (!token) return res.status(403).json({ message: "No hay token" });
  const decoded = jwt.verify(token, "token");
  console.log(decoded);
  req.userId = decoded["_id"];
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user?.role } });

  if (roles[0].name === "admin") {
    next();
    return;
  }

  return res.status(403).json({ isAdmin: false });
};
