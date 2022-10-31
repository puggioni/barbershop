import { Router } from "express";
import User from "../../models/user";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const router = Router();

router.get("/pwdRst/sendEmail/:usrEmail", async (req, res) => {
  const { usrEmail } = req.params;
  try {
    User.findOne({email: usrEmail})
      .then(user => {
        const options = {
          method: 'post',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          data: {
            "sender": {
              "name": "Grupo Barbershop",
              "email": "grupo7henry@gmail.com"
            },
            "to": [
              {
                "email": `${user.email}`,
                "name": `${user.name}`
              }
            ],
            "subject": "Password Reset",
            "htmlContent": 
            `<html>
              <head></head>
                <h1>Henry Barbershop</h1>
                <body>
                  <p>Un reseteo de contraseña fue pedido para esta cuenta,</p>
                  <p>si fue asi hace click en el siguiente boton, sino ignora este email.</p>
                  <p>
                  <button type="button"><a href="${process.env.CLIENT_URL}/passwordReset/${user._id}">Reset Password</a></button>
                  </p>
                </body>
            </html>`
          },
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'api-key': `${process.env.SENDINBLUE_API_KEY}`
          }
        };
        return axios(options)
      })
      .then(mailServerRes => {
        console.log(mailServerRes);
        res.status(200).send("Success");
      })
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;