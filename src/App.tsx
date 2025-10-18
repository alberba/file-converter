import "./App.css";
import DropZone from "./components/DropZone";
import LandingPage from "./components/LandingPage/LandingPage";

import { fileToImage } from "./utils/imageUtils";
import { useState } from "react";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [originalFileURL, setOriginalFileURL] = useState<string | null>(null);

  const [options, setOptions] = useState<{
    newWidth: number;
    newHeight: number;
    selectedFormat: string;
    quality: number;
  }>({
    newWidth: 0,
    newHeight: 0,
    selectedFormat: "webp",
    quality: 0.8,
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
    setFileName(file.name.slice(0, file.name.lastIndexOf(".")) || file.name);
    setFileSize(file.size);

    URL.revokeObjectURL(originalFileURL || "");
    setOriginalFileURL(URL.createObjectURL(file));

    const img = await fileToImage(file);
    setImage(img);
    setOptions({ ...options, newWidth: img.width, newHeight: img.height });
  };

  return (
    <>
      <div className="my-0 flex w-full min-h-screen flex-col items-center bg-gray-50 text-gray-800">
        {!image ? (
          <LandingPage handleDrop={handleDrop} />
        ) : (
          <DropZone
            file={{ name: fileName, img: image, originalSize: fileSize }}
            originalFileURL={originalFileURL!}
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
