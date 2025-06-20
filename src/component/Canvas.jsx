import { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { useDrawing } from "../context/DrawingContext";

const Canvas = () => {
  const { shapes, annotationsVisible, tool, setShapes } = useDrawing();
  const [newShape, setNewShape] = useState(null);
  const stageHeight = window.innerHeight;
  const stageWidth = window.innerWidth;

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    console.log({ point });
    if (tool === "rect") {
      setNewShape({
        type: "rect",
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!newShape) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    console.log("move", point);

    if (newShape.type === "rect") {
      setNewShape((prev) => ({
        ...prev,
        width: point.x - prev.x,
        height: point.y - prev.y,
      }));
    }
  };

  const handleMouseUp = () => {
    if (newShape) {
      setShapes([...shapes, newShape]);
      setNewShape(null);
    }
  };

  return (
    <Stage
      width={stageWidth}
      height={stageHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {[...shapes, ...(newShape ? [newShape] : [])].map((shape, i) => {
          return (
            <>
              <Rect
                key={i}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill="rgba(0,0,255,0.2)"
                stroke="blue"
              />
              {annotationsVisible && (
                <Text
                  text={`W: ${Math.abs(shape.width)} H: ${Math.abs(
                    shape.height
                  )}`}
                  x={shape.x}
                  y={shape.y - 20}
                  fontSize={14}
                  fill="black"
                />
              )}
            </>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
