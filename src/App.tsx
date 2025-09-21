import "./App.css";
import DropZone from "./components/DropZone";
import LandingPage from "./LandingPage";

import { fileToImage } from "./utils/imageUtils";
import { useState } from "react";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [newWidth, setNewWidth] = useState<number | null>(null);
  const [newHeight, setNewHeight] = useState<number | null>(null);

  const handleDrop = async (dragEvent: React.DragEvent<HTMLElement>) => {
    dragEvent.preventDefault();
    const droppedFile = dragEvent.dataTransfer.files[0];
    if (!droppedFile) return;
    setFileName(droppedFile.name);

    const img = await fileToImage(droppedFile);
    setImage(img);
    setNewWidth(img.width);
    setNewHeight(img.height);
  };

  return (
    <>
      <div className="mx-auto my-0 flex flex-col items-center bg-gray-50 text-gray-800">
        {!image ? (
          <LandingPage handleDrop={handleDrop} />
        ) : (
          <DropZone
            image={image}
            fileName={fileName}
            newHeight={newHeight}
            newWidth={newWidth}
            setNewHeight={setNewHeight}
            setNewWidth={setNewWidth}
            handleDrop={handleDrop}
          />
        )}
      </div>
    </>
  );
}

export default App;
