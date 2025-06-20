import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);
  const [drawingMode, setDrawingMode] = useState("free");
  const startPoint = useRef({ x: 0, y: 0 });
  const savedImage = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.lineCap = "round";
    context.strokeStyle = "black";
    setCtx(context);
  }, []);

  const startDrawing = (e) => {
    isDrawing.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawingMode === "rectangle") {
      startPoint.current = { x: offsetX, y: offsetY };
      savedImage.current = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    } else if (drawingMode === "free") {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawingMode === "rectangle") {
      const { x: startX, y: startY } = startPoint.current;
      ctx.putImageData(savedImage.current, 0, 0);
      const width = offsetX - startX;
      const height = offsetY - startY;
      ctx.strokeRect(startX, startY, width, height);
    } else if (drawingMode === "free") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    if (drawingMode === "free") {
      ctx.closePath();
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setDrawingMode("free")}>Free Draw</button>
        <button onClick={() => setDrawingMode("rectangle")}>Rectangle</button>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid #000", cursor: "crosshair" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;
