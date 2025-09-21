import "./App.css";
import DropZone from "./components/DropZone";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="mx-auto my-0 flex flex-col items-center bg-gray-50 text-gray-800">
        <Header />
        <DropZone />
      </div>
    </>
  );
}

export default App;
