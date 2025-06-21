import "./App.css";
import Canvas from "./component/Canvas";
import ToolBar from "./component/ToolBar";

function App() {
  return (
    <div className="px-4 py-2">
      <ToolBar />
      <Canvas />
    </div>
  );
}

export default App;
