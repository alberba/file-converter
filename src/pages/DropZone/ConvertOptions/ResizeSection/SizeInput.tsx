import InputBase from "./InputBase";

type SizeInputProps = {
  type: "Width" | "Height";
  value: number;
  setValue: (value: number) => void;
};

export default function SizeInput({ type, value, setValue }: SizeInputProps) {
  const id = `${type.toLowerCase()}-input`;

  return (
    <InputBase title={type} htmlFor={id}>
      <input
        className="w-full rounded-md bg-gray-200 p-1 px-3 text-sm"
        type="number"
        id={id}
        value={value || 0}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </InputBase>
  );
}
