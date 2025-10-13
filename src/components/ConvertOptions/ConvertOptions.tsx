import FormatSelector from "./FormatSelector";
import SizeInput from "./SizeInput";
import { useState } from "react";

import { downloadImage, formatBytes } from "../../utils/imageUtils";
import type { ConversionOptions, FileData } from "../../types/types";
import Badge from "../Badge";
import FileSizeChange from "./FileSizeChange";

import arrowDropDown from "../../assets/arrow-prev-up.svg";

type ConvertOptionsProps = {
  file: FileData;
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
  convertedImageBlob: Blob;
};

export default function ConvertOptions({
  file,
  options,
  onOptionsChange,
  convertedImageBlob,
}: ConvertOptionsProps) {
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const [isOptionsVisible, setOptionsVisible] = useState<boolean>(true);

  const { value: fileSize, unit: fileSizeUnit } = formatBytes(
    convertedImageBlob.size,
  );

  const sizeChangePercentage = (
    (convertedImageBlob.size / file.originalSize - 1) *
    100
  ).toFixed(0);
  const isSizeChangeLarger = parseInt(sizeChangePercentage) > 0;

  const convertToFormat = () => {
    downloadImage(convertedImageBlob, file.name, options.selectedFormat);
  };

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

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
    <aside
      className={`absolute right-0 bottom-0 m-4 flex w-76 flex-col rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-2xl transition-all duration-500 ${isOptionsVisible ? "gap-4" : "gap-0"}`}
    >
      <div className="flex justify-between" onClick={toggleOptions}>
        <h2 className="text-2xl font-bold">File Options</h2>
        <img
          className={`h-8 ${isOptionsVisible ? "-rotate-180" : "rotate-0"} transition-all duration-300`}
          src={arrowDropDown}
          alt=""
        />
      </div>
      <div
        className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ${isOptionsVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex gap-2">
          <FormatSelector
            selectedFormat={options.selectedFormat}
            setSelectedFormat={(selectedFormat: string) =>
              onOptionsChange({ ...options, selectedFormat })
            }
          />
        </div>
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
        </div>
        <div className="mt-4 flex w-full items-center gap-3">
          <Badge className="relative text-xl" variant="secondary">
            {fileSize} <span className="text-sm">{fileSizeUnit}</span>
            <FileSizeChange
              isLarger={isSizeChangeLarger}
              percentage={sizeChangePercentage}
            />
          </Badge>

          <Badge
            className="ml-auto cursor-pointer"
            asButton
            variant="primary"
            onClick={convertToFormat}
            data-testid="convert-button-badge"
          >
            Convert Image
          </Badge>
        </div>
      </div>
    </aside>
  );
}
