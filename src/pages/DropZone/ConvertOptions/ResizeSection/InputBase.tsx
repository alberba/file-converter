type InputBaseProps = {
  children: React.ReactNode;
  title: string;
  htmlFor: string;
};

export default function InputBase({
  children,
  title,
  htmlFor,
}: InputBaseProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center justify-between gap-12"
    >
      <span className="w-11">{title}:</span>
      {children}
    </label>
  );
}
