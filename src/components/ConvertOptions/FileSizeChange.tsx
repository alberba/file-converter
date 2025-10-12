import ArrowUp from "@/assets/ArrowUp";

interface FileSizeChangeProps {
  isLarger: boolean;
  percentage: string;
}

export default function FileSizeChange({
  isLarger,
  percentage,
}: FileSizeChangeProps) {
  return (
    <span className="bg-accent absolute -top-3 -right-2 flex items-center gap-0.5 rounded-4xl p-1 text-xs font-semibold text-white">
      <ArrowUp className={`h-2.5 w-2.5 ${isLarger ? "" : "rotate-180"}`} />
      {Math.abs(parseInt(percentage))}%
    </span>
  );
}
