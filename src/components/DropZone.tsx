import { useEffect, useRef, useState } from "react";
import { fileToImage } from "../utils/imageUtils";
import ConvertOptions from "./ConvertOptions/ConvertOptions";

export default function DropZone() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [newWidth, setNewWidth] = useState<number | null>(null);
  const [newHeight, setNewHeight] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = newWidth || image.width;
      canvas.height = newHeight || image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, [image, newHeight, newWidth]);

  return (
    <section className="mt-8 flex w-3/4 justify-center gap-8">
      <main
        className="flex aspect-square w-full max-w-2xl items-center justify-center rounded-2xl border border-gray-200 p-4 text-center shadow-2xl"
        onDrop={handleDrop}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      >
        {image ? <canvas ref={canvasRef} className="w-full" /> : "Drop files here"}
      </main>
      {image && (
        <ConvertOptions
          newWidth={newWidth}
          newHeight={newHeight}
          setNewWidth={setNewWidth}
          setNewHeight={setNewHeight}
          image={image}
          fileName={fileName!}
        />
      )}
    </section>
  );
}
