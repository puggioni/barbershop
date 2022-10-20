import jwt from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";
import { Request, Response, NextFunction } from "express";
import { getGoogleOAuthTokens, getGoogleUser } from "./googleAuth";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No hay token" });
    const decoded = jwt.verify(token, "token");
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

export const googleOauthHandler = async (req: Request, res: Response) => {
  //codigo desde qs
  const code = req.query.code as string;

  try {
    //obtenemos el id y token de acceso de google
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    //obtenemos el usuario con los tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    //verificamos si el usuario existe en la base de datos
    const user = await User.findOne({ email: googleUser.email });

    //si no existe lo creamos
    if (!user) {
      const newUser = new User({
        name: googleUser.name,
        email: googleUser.email,
        password: "google",
      });
      await newUser.save();
    }
    //creamos el token
    const token = jwt.sign({ _id: user._id }, "token", {
      expiresIn: 60 * 60 * 24,
    });
    const response = {
      user,
      token,
    };
    //enviamos el token
    res.header("auth-token", token).send(response);
  } catch (error) {}
};
