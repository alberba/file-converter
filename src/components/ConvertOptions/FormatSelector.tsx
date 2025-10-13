import arrowDropDown from "../../assets/arrow-prev-up.svg";

type FormatSelectorProps = {
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
};

export default function FormatSelector({
  selectedFormat,
  setSelectedFormat,
}: FormatSelectorProps) {
  const formats = ["png", "jpg", "webp"];

  return (
    <div className="relative flex w-full items-center justify-between gap-2">
      <select
        className="w-full appearance-none rounded-md bg-gray-200 p-2 font-[500]"
        name=""
        id=""
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        {formats.map((format) => {
          return (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute right-2">
        <img className="h-6 -rotate-180" src={arrowDropDown} alt="" />
      </div>
    </div>
  );
}
