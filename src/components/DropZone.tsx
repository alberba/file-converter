import { useEffect, useRef } from "react";
import ConvertOptions from "./ConvertOptions/ConvertOptions";
import cloudSvg from "../assets/cloud.svg";

type DropZoneProps = {
  image: HTMLImageElement;
  handleDrop: (dragEvent: React.DragEvent<HTMLElement>) => Promise<void>;
  fileName: string | null;
  newWidth: number | null;
  newHeight: number | null;
  setNewWidth: (width: number) => void;
  setNewHeight: (height: number) => void;
};

export default function DropZone({
  image,
  handleDrop,
  fileName,
  newHeight,
  newWidth,
  setNewHeight,
  setNewWidth,
}: DropZoneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        <canvas ref={canvasRef} className="w-full" />
      </main>
      <ConvertOptions
        newWidth={newWidth}
        newHeight={newHeight}
        setNewWidth={setNewWidth}
        setNewHeight={setNewHeight}
        image={image}
        fileName={fileName!}
      />
      <button
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img
          src={cloudSvg}
          className="h-18 drop-shadow-[0_12px_12px_rgba(0,0,0,0.3)]"
          alt="Go to Home Page"
        />
      </button>
    </section>
  );
}
