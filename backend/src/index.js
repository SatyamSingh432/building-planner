import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
  });
});
