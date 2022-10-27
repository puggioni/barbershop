import { Router } from "express"; 
import User from "../../models/user";  
import { verifyToken } from "../../middlewares/auth"; 
import { Request, Response } from "express"; 
var mongoose = require('mongoose');
const router = Router(); 
  
 router.post("/addFavorite",verifyToken, async (req: Request, res: Response) => { 
     const { productId, userId } = req.body; 
     try {
       User.findById(userId)
       .then(user => {
         user.favorites_products.push(mongoose.Types.ObjectId(productId));
         return user.save();     
       })
       .then(savedUser => 
         User.findById(savedUser._id).populate("favorites_products"))
       .then(completeUser => res.send(completeUser));
     } catch (error) { 
       console.log(error);
       res.status(500).json({ message: "Error al agregar a favoritos" }); 
     } 
   });
 export default router;