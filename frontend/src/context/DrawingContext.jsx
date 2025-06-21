import { createContext, useContext, useState } from "react";

const DrawingContext = createContext();

const useDrawing = () => useContext(DrawingContext);

const DrawingProvider = ({ children }) => {
  const [tool, setTool] = useState("select");
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  const [shapes, setShapes] = useState([]);

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
