import type { ReactNode, InputHTMLAttributes } from "react";
import { useId } from "react";
type TextboxProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
};

const css = "border rounded-md p-2 bg-white border-border-inputs";

export default function Textbox({
  children,
  id ,
  placeholder = "",
  type = "textbox",
  className = "",
  ...props
}: TextboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className="flex flex-col justify-self-auto w-full gap-3">
      <label htmlFor={inputId}>{children}</label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`${css} ${className}`}
        {...props}
      />
    </div>
  );
}
