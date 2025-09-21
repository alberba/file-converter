import "./App.css";
import DropZone from "./DropZone";
import Header from "./Header";

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
