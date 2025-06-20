import { createContext, useContext, useState } from "react";

const DrawingContext = createContext();

const useDrawing = () => useContext(DrawingContext);

const DrawingProvider = ({ children }) => {
  const [tool, setTool] = useState("select");
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  //   Mock data
  const [shapes, setShapes] = useState([
    { type: "rect", x: 10, y: 20, width: 100, height: 100 },
  ]);

  return (
    <DrawingContext.Provider
      value={{
        tool,
        setTool,
        annotationsVisible,
        setAnnotationsVisible,
        shapes,
        setShapes,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export { useDrawing, DrawingProvider };
