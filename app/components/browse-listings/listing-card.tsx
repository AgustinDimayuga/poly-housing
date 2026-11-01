import Image from "next/image";
import Link from "next/link";
import Icon from "./icon";
import { dateLabel, number, type Home } from "./data";

export default function ListingCard({ home }: { home: Home }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border-inputs bg-white shadow-[0_3px_10px_#20382f04]">
      <div className="relative aspect-[1.9] overflow-hidden rounded-[10px] bg-mini-labels">
        <Link
          href="/listing"
          aria-label={`View ${home.name}`}
          className="absolute inset-0">
          <Image
            src={home.image}
            alt={home.alt}
            fill
            unoptimized
            sizes="(max-width: 540px) 100vw, (max-width: 1100px) 45vw, 30vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <button
          type="button"
          disabled
          aria-label={`Save ${home.name}`}
          className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-white text-poly-green-dark shadow-sm transition-colors hover:bg-mini-labels focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poly-green-dark">
          <Icon name="bookmark" className={"size-4"} />
        </button>
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-medium text-poly-green-dark">
          Students welcome
        </span>
      </div>
      <div className="p-3.5">
        <p className="mb-2 text-[23px] leading-none font-semibold tracking-[-0.4px]">
          ${number(home.rent)}
          <span className="text-[11px] font-normal tracking-normal">
            {" "}
            / month
          </span>
        </p>
        <h3 className="mb-2 text-[15px] font-semibold">
          <Link
            href="/listing"
            className="hover:underline hover:underline-offset-4">
            {home.name}
          </Link>
        </h3>
        <p className="mb-2 text-[11px] text-under-input">
          {home.address} · {home.neighborhood}
        </p>
        <p className="mb-2 text-xs">
          {home.beds ? `${home.beds} beds` : "Studio"} ·{" "}
          {home.baths} {home.baths === 1 ? "bath" : "baths"} ·{" "}
          {number(home.area)} sq ft
        </p>
        <p className="mb-2 flex items-center gap-1.5 border-t border-border-inputs pt-2 text-[11px]">
          <Icon
            name="calendar"
            className="size-3 text-poly-green-dark"
          />
          Available {dateLabel(home.date)}
        </p>
        <p className="text-[11px] text-under-input">
          {home.note}
        </p>
      </div>
    </article>
  );
}
