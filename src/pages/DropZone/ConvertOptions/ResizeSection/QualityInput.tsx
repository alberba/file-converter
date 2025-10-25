import { useState } from "react";
import { type ConversionOptions } from "@/types/types";
import InputBase from "./InputBase";

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
    <InputBase title="Quality" htmlFor="quality-input">
      <div className="flex w-full gap-2">
        <input
          className="w-full"
          type="range"
          id="quality-input"
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
        <span className="text-sm">{Math.round(tempQuality * 100)}%</span>
      </div>
    </InputBase>
  );
}
