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

router.put("/:id", async (req, res) => {
  try {
    const updatedShape = await Shape.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedShape) {
      return res.status(404).json({ message: "Shape not found" });
    }
    res.json(updatedShape);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedShape = await Shape.findByIdAndDelete(req.params.id);
    if (!deletedShape) {
      return res.status(404).json({ message: "Shape not found" });
    }
    res.json({ message: "Shape deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    await Shape.deleteMany({});
    res.json({ message: "All shapes deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
