type FormatSelectorProps = {
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
};

export default function FormatSelector({
  selectedFormat,
  setSelectedFormat,
}: FormatSelectorProps) {
  const formats = ["png", "jpg", "webp", "gif"];

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          className="rotate-270"
          viewBox="0 0 24 24"
        >
          <path
            fill="#0F0F0F"
            d="M14.29 5.7a1 1 0 0 0-1.41 0l-4.9 4.9a2 2 0 0 0 0 2.83l4.9 4.89a1 1 0 0 0 1.41-1.42l-4.18-4.18a1 1 0 0 1 0-1.42l4.18-4.18a1 1 0 0 0 0-1.41Z"
          />
        </svg>
      </div>
    </div>
  );
}
