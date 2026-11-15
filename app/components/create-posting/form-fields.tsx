import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes
} from "react";
import Textbox from "../text";

export function Section({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border-inputs bg-white p-5 sm:p-6">
      <h2 className="mb-5 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="text-xs font-semibold [&>div]:gap-2 [&_input]:h-11 [&_input]:min-w-0 [&_input]:text-sm [&_input]:font-normal [&_input]:outline-none [&_input]:focus:border-poly-green-dark [&_input]:focus:ring-2 [&_input]:focus:ring-poly-green-dark/15">
      <Textbox {...props}>{label}</Textbox>
    </div>
  );
}

export function SelectField({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-xs font-semibold">
      {label}
      <select
        {...props}
        className="h-11 w-full rounded-md border border-border-inputs bg-white px-3 text-sm font-normal outline-none focus:border-poly-green-dark focus:ring-2 focus:ring-poly-green-dark/15">
        {children}
      </select>
    </label>
  );
}

export function Checkbox({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-signup-title-green">
      <input
        {...props}
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-poly-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poly-green-dark"
      />
      <span>{children}</span>
    </label>
  );
}

export function Icon({
  name,
  className = "size-4"
}: {
  name: "save" | "upload" | "bulb" | "arrow" | "check";
  className?: string;
}) {
  const paths = {
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4v12a2 2 0 0 1-2 2Z" />
        <path d="M7 3v6h10V3M7 21v-8h10v8" />
      </>
    ),
    upload: <path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5" />,
    bulb: (
      <path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z" />
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      {paths[name]}
    </svg>
  );
}
