import express from "express";
import Shape from "../models/Shapes.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const shape = new Shape(req.body);
    const savedShape = await shape.save();
    res.status(201).json(savedShape);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const shapes = await Shape.find();
    res.json(shapes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
