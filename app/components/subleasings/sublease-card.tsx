import Image from "next/image";
import Button from "../button";
import Icon from "../browse-listings/icon";
import type { Sublease } from "./data";

export default function SubleaseCard({
  sublease
}: {
  sublease: Sublease;
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border-inputs bg-white">
      <div className="relative aspect-[2.52] overflow-hidden rounded-[10px] bg-mini-labels">
        <Image
          src={sublease.image}
          alt={sublease.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-medium text-poly-green-dark">
          Summer · {sublease.duration}
        </span>
        <button
          type="button"
          aria-label={`Save ${sublease.title}`}
          className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-white text-poly-green-dark">
          <Icon name="bookmark" className="size-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-[17px]">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[23px] leading-tight font-semibold tracking-[-0.4px]">
            ${sublease.rent.toLocaleString("en-US")} / mo
          </p>
          <span className="rounded-full bg-mini-labels px-2.5 py-1 text-[10px] leading-none font-medium text-poly-green-dark">
            Students welcome
          </span>
        </div>
        <h3 className="text-base font-semibold">
          {sublease.title}
        </h3>
        <p className="mt-2 text-[11px] text-under-input">
          {sublease.address}
        </p>
        <p className="mt-2.5 flex items-center gap-2 text-xs font-medium">
          <Icon
            name="calendar"
            className="size-3.5 shrink-0 text-poly-green-dark"
          />
          {sublease.dates}
        </p>
        <p className="mt-2.5 text-xs">{sublease.room}</p>
        <p className="mt-2.5 mb-2 text-[11px] text-under-input">
          {sublease.utilities}
        </p>
        <p className="mt-auto border-t border-border-inputs pt-2.5 text-[11px] text-under-input">
          Posted by {sublease.student}
        </p>
        <Button
          variant="white"
          className="mt-2 min-h-10 w-full text-[13px] font-semibold text-signup-title-green">
          View sublease
        </Button>
      </div>
    </article>
  );
}
