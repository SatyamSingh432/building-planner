import { useDrawing } from "../context/DrawingContext";

const TOOL_LIST = ["select", "rect", "circle", "line", "arrow"];

const Toolbar = () => {
  const {
    tool,
    setTool,
    annotationsVisible,
    setAnnotationsVisible,
    setShapes,
  } = useDrawing();

  return (
    <div className="flex gap-2 p-2 bg-gray-100">
      {TOOL_LIST.map((selectedTool) => (
        <button
          key={selectedTool}
          className={`px-3 py-1 rounded ${
            tool === selectedTool ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setTool(selectedTool)}
        >
          {selectedTool}
        </button>
      ))}
      <button
        onClick={() => setShapes([])}
        className="ml-auto px-3 py-1 rounded bg-gray-300 cursor-pointer"
      >
        Clear
      </button>

      <button
        onClick={() => setAnnotationsVisible(!annotationsVisible)}
        className="ml-auto px-3 py-1 rounded bg-gray-300"
      >
        {annotationsVisible ? "Hide" : "Show"} Annotations
      </button>
    </div>
  );
};

export default Toolbar;
