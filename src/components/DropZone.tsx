import { useState } from "react";
import { loadImageAsDataURL, fileToImage } from "../utils/imageUtils";
import ConvertOptions from "./ConvertOptions/ConvertOptions";

export default function DropZone() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [newWidth, setNewWidth] = useState<number | null>(null);
  const [newHeight, setNewHeight] = useState<number | null>(null);

  const handleDrop = async (dragEvent: React.DragEvent<HTMLElement>) => {
    dragEvent.preventDefault();
    const droppedFile = dragEvent.dataTransfer.files[0];
    if (!droppedFile) return;

    setFile(droppedFile);
    await setSize(droppedFile);

    setImagePreview(await loadImageAsDataURL(droppedFile));
  };

  const setSize = async (droppedFile: File) => {
    const image = await fileToImage(droppedFile);
    setNewHeight(image.height);
    setNewWidth(image.width);
  };

  return (
    <section className="mt-8 flex w-3/4 justify-center gap-8">
      <main
        className="flex aspect-square w-full max-w-2xl items-center justify-center rounded-2xl border border-gray-200 p-4 text-center shadow-2xl"
        onDrop={handleDrop}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" />
        ) : (
          "Drop files here"
        )}
      </main>
      {file && (
        <ConvertOptions
          newWidth={newWidth}
          newHeight={newHeight}
          setNewWidth={setNewWidth}
          setNewHeight={setNewHeight}
          file={file}
        />
      )}
    </section>
  );
}
