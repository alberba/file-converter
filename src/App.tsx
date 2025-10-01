import "./App.css";
import DropZone from "./components/DropZone";
import LandingPage from "./LandingPage";

import { fileToImage } from "./utils/imageUtils";
import { useState } from "react";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);

  const [options, setOptions] = useState<{
    newWidth: number;
    newHeight: number;
    selectedFormat: string;
  }>({
    newWidth: 0,
    newHeight: 0,
    selectedFormat: "webp",
  });

  const handleDrop = async (
    event: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ) => {
    let file: File | null = null;
    if ("dataTransfer" in event) {
      event.preventDefault();
      file = event.dataTransfer.files[0];
    } else {
      const input = event.target as HTMLInputElement;
      file = input.files?.[0] || null;
    }

    if (!file) return;
    setFileName(file.name);
    setFileSize(file.size);

    const img = await fileToImage(file);
    setImage(img);
    setOptions({ ...options, newWidth: img.width, newHeight: img.height });
  };

  return (
    <>
      <div className="mx-auto my-0 flex flex-col items-center bg-gray-50 text-gray-800">
        {!image ? (
          <LandingPage handleDrop={handleDrop} />
        ) : (
          <DropZone
            file={{ name: fileName, img: image, originalSize: fileSize }}
            options={options}
            onOptionsChange={setOptions}
            handleDrop={handleDrop}
          />
        )}
      </div>
    </>
  );
}

export default App;
