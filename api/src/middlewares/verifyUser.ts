import jwt from "jsonwebtoken";
import Role from "../models/role";
import User from "../models/user";

export const verifyUser = async (req, res, next) => {
  const token = req.body.header["token"];

  try {
    if (!token) return res.status(403).json({ message: "No hay token" });
    const decoded = jwt.verify(token, "token");
    req.userId = decoded["_id"];
    const user = await User.findById(req.userId, { password: 0 });
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
  req.userId = decoded["_id"];
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user?.role } });

  if (roles[0].name === "admin") {
    next();
    return;
  }

  return res.status(403).json({ isAdmin: false });
};
