import { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";
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
    } else if (tool === "circle") {
      setNewShape({ type: "circle", x: point.x, y: point.y, radius: 0 });
    } else if (tool === "line") {
      setNewShape({
        type: "line",
        points: [point.x, point.y, point.x, point.y],
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
    } else if (newShape.type === "circle") {
      const dx = point.x - newShape.x;
      const dy = point.y - newShape.y;
      setNewShape((prev) => ({
        ...prev,
        radius: Math.sqrt(dx * dx + dy * dy),
      }));
    } else if (newShape.type === "line") {
      setNewShape((prev) => ({
        ...prev,
        points: [prev.points[0], prev.points[1], point.x, point.y],
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
          switch (shape.type) {
            case "rect":
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
            case "circle":
              return (
                <>
                  <Circle
                    key={i}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill="rgba(255,0,0,0.2)"
                    stroke="red"
                  />
                  {annotationsVisible && (
                    <Text
                      text={`R: ${Math.abs(shape.radius)}`}
                      x={shape.x - 10}
                      y={shape.y - shape.radius - 20}
                      fontSize={14}
                      fill="black"
                    />
                  )}
                </>
              );
            case "line":
              return (
                <>
                  <Line
                    key={i}
                    points={shape.points}
                    stroke="green"
                    strokeWidth={2}
                  />
                  {annotationsVisible && shape.points.length === 4 && (
                    <Text
                      text={`Length: ${Math.hypot(
                        shape.points[2] - shape.points[0],
                        shape.points[3] - shape.points[1]
                      ).toFixed(1)}`}
                      x={(shape.points[0] + shape.points[2]) / 2}
                      y={(shape.points[1] + shape.points[3]) / 2 - 10}
                      fontSize={14}
                      fill="black"
                    />
                  )}
                </>
              );
            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
