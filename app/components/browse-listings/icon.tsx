import type { SVGProps } from "react";

type IconName =
  | "home"
  | "search"
  | "calendar"
  | "bookmark"
  | "chevron"
  | "arrow"
  | "plus"
  | "cap";

export default function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v11H3Z" />
        <path d="M9 21V11h6v10" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M4 10h16" />
      </>
    ),
    bookmark: <path d="M6 4h12v17l-6-4-6 4Z" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    plus: <path d="M12 4v16M4 12h16" />,
    cap: (
      <>
        <path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6M22 9v8" />
      </>
    )
  };
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      {paths[name]}
    </svg>
  );
}
