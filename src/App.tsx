import "./App.css";
import DropZone from "./pages/DropZone/DropZone";
import LandingPage from "./pages/LandingPage/LandingPage";
import type { FileData } from "./types/types";

import { fileToImage, removeExtFromFileName } from "./utils/imageUtils";
import { useState } from "react";

function App() {
  const [file, setFile] = useState<FileData | null>(null);
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

  const getFilefromEvent = (
    event: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ): File | null => {
    if ("dataTransfer" in event) {
      event.preventDefault();
      return event.dataTransfer.files[0];
    } else {
      const input = event.target as HTMLInputElement;
      return input.files?.[0] || null;
    }
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLElement> | React.FormEvent<HTMLElement>,
  ) => {
    let file: File | null = null;
    file = getFilefromEvent(event);

    if (!file) return;

    URL.revokeObjectURL(originalFileURL || "");
    setOriginalFileURL(URL.createObjectURL(file));

    const img = await fileToImage(file);
    setFile({
      name: removeExtFromFileName(file.name),
      img,
      originalSize: file.size,
    });
    setOptions({ ...options, newWidth: img.width, newHeight: img.height });
  };

  return (
    <>
      <div className="my-0 flex w-full min-h-screen flex-col items-center bg-gray-50 text-gray-800">
        {!file ? (
          <LandingPage handleDrop={handleDrop} />
        ) : (
          <DropZone
            file={file}
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
