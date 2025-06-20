import { Stage, Layer, Rect, Text } from "react-konva";
import { useDrawing } from "../context/DrawingContext";

const Canvas = () => {
  const { shapes, annotationsVisible } = useDrawing();

  const stageHeight = window.innerHeight;
  const stageWidth = window.innerWidth;

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        {shapes.map((shape, i) => {
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
