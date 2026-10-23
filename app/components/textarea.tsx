import type { ReactNode, TextareaHTMLAttributes } from "react";

type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    children: ReactNode; // label text, same pattern as Textbox
  };

const css =
  "border rounded-md p-2 bg-white border-border-inputs resize-none";

export default function Textarea({
  children,
  id = "",
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <label htmlFor={id} className="text-xs font-semibold">
        {children}
      </label>
      <textarea
        id={id}
        className={`${css} ${className}`}
        {...props}
      />
    </div>
  );
}
