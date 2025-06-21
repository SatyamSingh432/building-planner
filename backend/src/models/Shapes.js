import mongoose from "mongoose";

const shapeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["rect", "circle", "line", "arrow"],
      required: true,
    },
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    radius: Number,
    points: [Number],
  },
  { timestamps: true }
);

export default mongoose.model("Shape", shapeSchema);
