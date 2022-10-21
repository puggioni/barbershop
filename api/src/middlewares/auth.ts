import jwt from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
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
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.role } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Requiere ser moderador" });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user?.role } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ isAdmin: false });
};
