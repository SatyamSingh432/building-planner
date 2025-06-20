import { createContext, useContext, useState } from "react";

const DrawingContext = createContext();

const useDrawing = () => useContext(DrawingContext);

const DrawingProvider = ({ children }) => {
  const [tool, setTool] = useState("select");
  const [annotationsVisible, setAnnotationsVisible] = useState(true);

  return (
    <DrawingContext.Provider
      value={{
        tool,
        setTool,
        annotationsVisible,
        setAnnotationsVisible,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export { useDrawing, DrawingProvider };
