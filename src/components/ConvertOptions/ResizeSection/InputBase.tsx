type InputBaseProps = {
  children: React.ReactNode;
  title: string;
};

export default function InputBase({ children, title }: InputBaseProps) {
  return (
    <label className="flex items-center justify-between gap-12">
      <span className="w-11">{title}:</span>
      {children}
    </label>
  );
}
