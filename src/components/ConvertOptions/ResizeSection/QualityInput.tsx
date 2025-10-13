import { useState } from "react";
import { type ConversionOptions } from "@/types/types";

type QualityInputProps = {
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
};

export default function QualityInput({
  options,
  onOptionsChange,
}: QualityInputProps) {
  const [tempQuality, setTempQuality] = useState<number>(options.quality);

  return (
    <label className="flex items-center justify-between gap-12">
      Quality:
      <div className="flex gap-2">
        <input
          type="range"
          value={tempQuality}
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => setTempQuality(Number(e.target.value))}
          onMouseUp={() =>
            onOptionsChange({
              ...options,
              quality: tempQuality,
            })
          }
          onTouchEnd={() =>
            onOptionsChange({
              ...options,
              quality: tempQuality,
            })
          }
        />
        <span className="w-8 text-sm">
          {Math.round(options.quality * 100)}%
        </span>
      </div>
    </label>
  );
}
