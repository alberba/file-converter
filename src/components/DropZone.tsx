import { useEffect, useRef, useState } from "react";
import ConvertOptions from "./ConvertOptions/ConvertOptions";
import cloudSvg from "../assets/cloud.svg";
import type { ConversionOptions, FileData } from "../types/types";

type DropZoneProps = {
  handleDrop: (dragEvent: React.DragEvent<HTMLElement>) => Promise<void>;
  file: FileData;
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
};

export default function DropZone({
  file,
  handleDrop,
  options,
  onOptionsChange,
}: DropZoneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [convertedImageBlob, setConvertedImageBlob] = useState<Blob>(
    new Blob(),
  );

  const resizeAndRenderCanvas = (
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    newWidth: number,
    newHeight: number,
  ): HTMLCanvasElement | null => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas;
  };

  useEffect(() => {
    if (!file.img || !canvasRef.current) return;

    const imageCanvas = resizeAndRenderCanvas(
      canvasRef.current,
      file.img,
      options.newWidth,
      options.newHeight,
    );
    if (!imageCanvas) return;

    imageCanvas.toBlob((blob) => {
      if (blob) setConvertedImageBlob(blob);
      else console.error("Blob conversion failed");
    }, `image/${options.selectedFormat}`);
  }, [file.img, options]);

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
        file={file}
        options={options}
        onOptionsChange={onOptionsChange}
        convertedImageBlob={convertedImageBlob}
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
