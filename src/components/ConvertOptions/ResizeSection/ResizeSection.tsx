import SizeInput from "./SizeInput";
import type { ConversionOptions, FileData } from "@/types/types";

import { useState } from "react";
import QualityInput from "./QualityInput";

type ResizeSectionProps = {
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
  fileData: FileData;
};

export default function ResizeSection({
  options,
  onOptionsChange,
  fileData: file,
}: ResizeSectionProps) {
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);

  const handleDimensionChange = (type: "width" | "height", value: number) => {
    if (maintainRatio && file.img) {
      const aspectRatio = options.newWidth / options.newHeight;

      if (type === "width") {
        onOptionsChange({
          ...options,
          newHeight: Math.round(value / aspectRatio),
          newWidth: value,
        });
      } else {
        onOptionsChange({
          ...options,
          newWidth: Math.round(value * aspectRatio),
          newHeight: value,
        });
      }
    } else {
      onOptionsChange({
        ...options,
        newWidth: type === "width" ? value : options.newWidth,
        newHeight: type === "height" ? value : options.newHeight,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 text-xl font-bold">Resize</p>
      <SizeInput
        type="Width"
        value={options.newWidth}
        setValue={(value) => handleDimensionChange("width", value)}
      />
      <SizeInput
        type="Height"
        value={options.newHeight}
        setValue={(value) => handleDimensionChange("height", value)}
      />
      <label className="mt-1 flex justify-between">
        Maintain aspect ratio
        <input
          type="checkbox"
          checked={maintainRatio}
          onChange={() => setMaintainRatio(!maintainRatio)}
          className="w-4"
        />
      </label>
      {options.selectedFormat !== "png" && (
        <QualityInput options={options} onOptionsChange={onOptionsChange} />
      )}
    </div>
  );
}
