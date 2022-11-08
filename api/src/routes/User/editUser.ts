import { Router } from "express";
import User from "../../models/user";
import { verifyToken } from "../../middlewares/auth";
const router = Router();

router.put("/edit/:idUsr", verifyToken, async (req: any, res) => {
    let { email, name, lastname, phone_number, twofa, secret } = req.body;
    const { idUsr } = req.params;
    
    try {
        const user = await User.findById(idUsr);
        email ? (user.email = email) : {};
        name ? (user.name = name) : {};
        lastname ? (user.lastname = lastname) : {};
        phone_number ? (user.phone_number = phone_number) : {};
        (twofa === true) ? (user.twofa = true) : (user.twofa = false);
        secret ? (user.secret = secret) : {};
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
