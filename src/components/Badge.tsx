import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  asButton?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Badge({
  children,
  asButton = false,
  className = "",
  variant = "primary",
  ...props
}: BadgeProps) {
  const Component = asButton ? "button" : "span";

  const baseStyle = "rounded-xl px-4 py-2 font-semibold ";
  const variantStyles = {
    primary: "bg-accent text-white ",
    secondary: "bg-gray-200 ",
  };
  const style = baseStyle + variantStyles[variant] + className;

  return (
    <Component className={style} {...props}>
      {children}
    </Component>
  );
}
