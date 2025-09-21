import FormatSelector from "./FormatSelector";
import SizeInput from "./SizeInput";
import { useState } from "react";

import {
  createCanvasFromImage,
  downloadImage,
} from "../../utils/imageUtils";

type ConvertOptionsProps = {
  newWidth: number | null;
  newHeight: number | null;
  image: HTMLImageElement;
  setNewWidth: (width: number) => void;
  setNewHeight: (height: number) => void;
  fileName: string;
};

export default function ConvertOptions({
  newWidth,
  newHeight,
  image,
  setNewWidth,
  setNewHeight,
  fileName,
}: ConvertOptionsProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("webp");
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);

  const convertToFormat = async () => {
    if (!newWidth || !newHeight) return;
    const { canvas, canvasContext } = createCanvasFromImage(
      newWidth,
      newHeight,
    );
    canvasContext.drawImage(image, 0, 0, newWidth, newHeight);

    const convertedImageBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject("Error en conversión")),
        `image/${selectedFormat}`,
      ),
    );

    downloadImage(convertedImageBlob, fileName, selectedFormat);
  };

  const handleNewWidth = (width: number) => {
    if (maintainRatio && image) {
      const aspectRatio = image.width / image.height;
      setNewHeight(Math.round(width / aspectRatio));
    }
    setNewWidth(width);
  };

  return (
    <aside className="absolute right-0 bottom-0 m-4 flex w-2xs flex-col gap-4 rounded-3xl border border-gray-200 p-4 shadow-2xl">
      <h2 className="text-2xl font-bold">File Options</h2>
      <div className="flex gap-2">
        <FormatSelector
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-xl font-bold">Resize</p>
        <SizeInput type="Width" value={newWidth!} setValue={handleNewWidth} />
        <SizeInput type="Height" value={newHeight!} setValue={setNewHeight} />
        <label className="mt-1 flex justify-between">
          Maintain aspect ratio
          <input
            type="checkbox"
            checked={maintainRatio}
            onChange={() => setMaintainRatio(!maintainRatio)}
            className="w-4"
          />
        </label>
      </div>
      <button
        className="mt-4 ml-auto w-fit rounded-2xl border bg-accent p-4 py-2 font-semibold text-white"
        onClick={convertToFormat}
        data-testid="convert-button"
      >
        Convert Image
      </button>
    </aside>
  );
}
