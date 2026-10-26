import Image from "next/image"
import Link from "next/link"
import Button from "./button"

const links = [
  { label: "Find housing", href: "/Listings" },
  { label: "Subleases", href: "#" },
  { label: "Saved homes", href: "#" },
]

export default function Header() {
  return (
    <header className="w-full bg-white text-black shadow-md">
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4 lg:px-10">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/house.png" alt="PolyHousing Logo" width={40} height={40} className="h-10 w-10" />
            <span className="whitespace-nowrap text-xl font-bold md:text-3xl">Poly Housing</span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex flex-row gap-5 text-under-input">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="whitespace-nowrap hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: actions, with margin from the edge */}
        <div className="hidden items-center gap-5 md:mr-6 md:flex lg:mr-12">
          <Button variant="white" className="whitespace-nowrap p-2">+ Post listing</Button>
          <Link href="./login" className="whitespace-nowrap font-inter font-bold hover:underline">Log in</Link>
        </div>

        {/* Mobile menu */}
        <details className="group relative md:hidden">
          <summary
            aria-label="Toggle menu"
            className="flex cursor-pointer list-none flex-col rounded-md border border-border-inputs p-2 [&::-webkit-details-marker]:hidden"
          >
            <span className="block h-0.5 w-5 bg-black" />
            <span className="mt-1 block h-0.5 w-5 bg-black" />
            <span className="mt-1 block h-0.5 w-5 bg-black" />
          </summary>

          <div className="absolute right-0 top-full z-50 mt-3 flex w-56 flex-col gap-3 rounded-2xl border border-border-inputs bg-white p-4 shadow-md">
            <ul className="flex flex-col gap-3 text-under-input">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
            <hr className="border-border-inputs" />
            <Button variant="white" className="p-2">+ Post listing</Button>
            <Link href="./login" className="font-inter font-bold hover:underline">Log in</Link>
          </div>
        </details>
      </div>
    </header>
  )
}
