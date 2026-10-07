import type { ButtonHTMLAttributes} from "react";

type ButtonVariant = "primary" | "secondary"|"white";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "rounded-md p-1 w-full bg-poly-green-dark text-white active:bg-green-button-click",
  secondary:"random shi ",
  white: "rounded-md p-1 w-full bg-white text-black active:bg-white-button-click"

};


export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type} className={[variantClasses[variant], className].join(" ")} {...props}>{children}</button>
  );
}
