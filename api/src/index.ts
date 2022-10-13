import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//=======CONNECT TO SERVER=======//
app.listen(process.env.PORT, () => {
  console.log(
    `Successfully started the server, listening on port: ${process.env.PORT}`
  );
});

//=======CONNECT TO MONGO=======//
import { config } from "./db";
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Started the database");
  })
  .catch((err) => {
    console.log(err);
  });
