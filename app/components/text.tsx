import type { ReactNode, InputHTMLAttributes } from "react";

type TextboxProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
};

const css = "border rounded-md p-2 bg-white border-border-inputs";

export default function Textbox({
  children,
  id = "",
  placeholder = "",
  type = "text",
  className = "",
  ...props
}: TextboxProps) {
  return (
    <div className="flex flex-col justify-self-auto w-full gap-3">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${css} ${className}`}
        {...props}
      />
    </div>
  );
}
