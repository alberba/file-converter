import { useCallback, useEffect, useRef, useState } from "react";
import ConvertOptions from "./ConvertOptions/ConvertOptions";
import cloudSvg from "../assets/cloud.svg";
import type { ConversionOptions, FileData } from "../types/types";

import { drawCanvas, fileToImage, resizeCanvas } from "../utils/imageUtils";

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

  const createCanvasPreview = useCallback(
    (blob: Blob, canvas: HTMLCanvasElement) => {
      fileToImage(blob).then((previewImg) => {
        drawCanvas(canvas, previewImg);
        URL.revokeObjectURL(previewImg.src);
      });
    },
    [],
  );

  const convertCanvasToBlob = (
    canvas: HTMLCanvasElement,
    format: string,
    quality: number,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else reject(new Error("Blob conversion failed"));
        },
        format,
        quality,
      );
    });
  };

  useEffect(() => {
    if (!file.img || !canvasRef.current) return;

    const imageCanvas = canvasRef.current;
    resizeCanvas(imageCanvas, options.newWidth, options.newHeight);
    drawCanvas(canvasRef.current, file.img);

    if (!imageCanvas) return;

    convertCanvasToBlob(
      imageCanvas,
      `image/${options.selectedFormat}`,
      options.quality,
    )
      .then((blob) => {
        setConvertedImageBlob(blob);
        if (options.selectedFormat !== "png")
          createCanvasPreview(blob, imageCanvas);
      })
      .catch((error) => console.error(error));
  }, [file.img, options, createCanvasPreview]);

  return (
    <section className="mt-8 flex max-w-2xl justify-center gap-8 p-2">
      <main
        className="flex aspect-square w-full items-center justify-center rounded-2xl border border-gray-200 p-4 text-center shadow-2xl"
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
        className="absolute top-2 right-2 cursor-pointer sm:top-5 sm:right-5"
        onClick={() => window.location.reload()}
      >
        <img
          src={cloudSvg}
          className="h-14 drop-shadow-[0_12px_12px_rgba(0,0,0,0.3)] md:h-18"
          alt="Go to Home Page"
        />
      </button>
    </section>
  );
}
