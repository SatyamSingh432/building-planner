import { Stage, Layer, Circle } from "react-konva";
import { useDrawing } from "../context/DrawingContext";

const Canvas = () => {
  const { tool } = useDrawing();
  console.log(tool);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={50}
          fill="red"
        />
      </Layer>
    </Stage>
  );
};

export default Canvas;
