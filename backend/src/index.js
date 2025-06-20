import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shapeRoutes from "./Routes/shapesRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/shapes", shapeRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
  });
});
