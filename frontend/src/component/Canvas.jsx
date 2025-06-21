import { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  Arrow,
  Text,
  Transformer,
} from "react-konva";
import { useDrawing } from "../context/DrawingContext";
import {
  saveShape,
  getAllShapes,
  deleteShape,
  updateShapeAPI,
} from "../utils/Apis";

const Canvas = () => {
  const { shapes, annotationsVisible, tool, setShapes } = useDrawing();
  const [newShape, setNewShape] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const stageHeight = window.innerHeight;
  const stageWidth = window.innerWidth;
  const shapeRefs = useRef([]);
  const transformerRef = useRef();

  useEffect(() => {
    const fetchShapes = async () => {
      const data = await getAllShapes();
      if (data) setShapes(data);
    };

    fetchShapes();
  }, []);
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedId !== null
      ) {
        console.log(shapes[selectedId]);
        const shapeToDelete = shapes[selectedId];

        try {
          await deleteShape(shapeToDelete._id);
        } catch (err) {
          console.error("Delete failed", err);
        }
        const updated = [...shapes];
        updated.splice(selectedId, 1);
        setShapes(updated);
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, shapes, setShapes]);

  useEffect(() => {
    const node = shapeRefs.current[selectedId];
    if (transformerRef.current && node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === "select") {
      const clickedOnEmpty = e.target === stage;
      if (clickedOnEmpty) {
        setSelectedId(null);
      }
      return;
    }

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
    } else if (tool === "arrow") {
      setNewShape({
        type: "arrow",
        points: [point.x, point.y, point.x, point.y],
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!newShape) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

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
    } else if (newShape.type === "arrow") {
      setNewShape((prev) => ({
        ...prev,
        points: [prev.points[0], prev.points[1], point.x, point.y],
      }));
    }
  };

  const handleMouseUp = async () => {
    if (newShape) {
      const shapeToSave = { ...newShape };
      await saveShape(shapeToSave);
      setShapes([...shapes, newShape]);
      setNewShape(null);
    }
  };

  const updateShape = (index, newAttrs) => {
    const updated = [...shapes];
    updated[index] = { ...updated[index], ...newAttrs };
    setShapes(updated);
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
        {[...shapes, ...(newShape ? [newShape] : [])].map((shape, idx) => {
          const isSelected = idx === selectedId;

          switch (shape.type) {
            case "rect":
              return (
                <>
                  <Rect
                    key={idx}
                    ref={(node) => (shapeRefs.current[idx] = node)}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill="rgba(0,0,255,0.2)"
                    stroke="blue"
                    draggable={tool === "select"}
                    onClick={() => tool === "select" && setSelectedId(idx)}
                    onDragEnd={async (e) => {
                      updateShape(idx, { x: e.target.x(), y: e.target.y() });
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        ...{ x: e.target.x(), y: e.target.y() },
                      });
                    }}
                    onTransformEnd={async (e) => {
                      const node = e.target;
                      const newAttrs = {
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * node.scaleX(),
                        height: node.height() * node.scaleY(),
                      };
                      updateShape(idx, newAttrs);
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        ...newAttrs,
                      });
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                  {isSelected && tool === "select" && (
                    <Transformer ref={transformerRef} rotateEnabled={false} />
                  )}
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
                    key={idx}
                    ref={(node) => (shapeRefs.current[idx] = node)}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill="rgba(255,0,0,0.2)"
                    stroke="red"
                    draggable={tool === "select"}
                    onClick={() => tool === "select" && setSelectedId(idx)}
                    onDragEnd={async (e) => {
                      const newAttrs = { x: e.target.x(), y: e.target.y() };
                      updateShape(idx, newAttrs);
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        ...newAttrs,
                      });
                    }}
                    onTransformEnd={async (e) => {
                      const node = e.target;
                      const newRadius = (node.width() * node.scaleX()) / 2;
                      const newAttrs = {
                        x: node.x(),
                        y: node.y(),
                        radius: newRadius,
                      };

                      updateShape(idx, newAttrs);
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        ...newAttrs,
                      });
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                  {isSelected && tool === "select" && (
                    <Transformer ref={transformerRef} rotateEnabled={false} />
                  )}
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
                    key={idx}
                    ref={(node) => (shapeRefs.current[idx] = node)}
                    points={shape.points}
                    stroke="green"
                    strokeWidth={2}
                    onClick={() => tool === "select" && setSelectedId(idx)}
                    draggable={tool === "select"}
                    onDragEnd={async (e) => {
                      const node = e.target;
                      const dx = node.x();
                      const dy = node.y();
                      const newPoints = shape.points.map((p, i) =>
                        i % 2 === 0 ? p + dx : p + dy
                      );
                      updateShape(idx, { points: newPoints });
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        points: newPoints,
                      });
                      node.position({ x: 0, y: 0 });
                    }}
                  />
                  {isSelected && tool === "select" && (
                    <Transformer
                      ref={transformerRef}
                      rotateEnabled={false}
                      enabledAnchors={[]}
                    />
                  )}
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
            case "arrow":
              return (
                <>
                  <Arrow
                    key={idx}
                    ref={(node) => (shapeRefs.current[idx] = node)}
                    points={shape.points}
                    pointerLength={10}
                    pointerWidth={10}
                    fill="black"
                    stroke="black"
                    strokeWidth={2}
                    onClick={() => tool === "select" && setSelectedId(idx)}
                    draggable={tool === "select"}
                    onDragEnd={async (e) => {
                      const node = e.target;
                      const dx = node.x();
                      const dy = node.y();
                      const newPoints = shape.points.map((p, i) =>
                        i % 2 === 0 ? p + dx : p + dy
                      );
                      updateShape(idx, { points: newPoints });
                      await updateShapeAPI(shape._id, {
                        ...shape,
                        points: newPoints,
                      });
                      node.position({ x: 0, y: 0 });
                    }}
                  />
                  {isSelected && tool === "select" && (
                    <Transformer
                      ref={transformerRef}
                      rotateEnabled={false}
                      enabledAnchors={[]}
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
