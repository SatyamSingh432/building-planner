import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);

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
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    ctx.closePath();
  };

  return (
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
  );
};

export default Canvas;
