import React, { useRef, useEffect } from "react";
import { Stage, Layer, Circle } from "react-konva";

const Canvas = () => {
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
