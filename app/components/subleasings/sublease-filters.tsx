import Button from "../button";
import Icon from "../browse-listings/icon";

export default function SubleaseFilters() {
  const filterClass =
    "flex min-h-10 items-center justify-center gap-2 px-4 text-xs font-semibold text-signup-title-green";
  return (
    <section
      aria-label="Sublease filters"
      className="mt-6 flex flex-wrap gap-2.5 rounded-xl border border-border-inputs bg-white p-3.5">
      <Button variant="white" className={filterClass}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
          className="size-4 text-poly-green-dark">
          <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        San Luis Obispo
      </Button>
      <Button variant="white" className={filterClass}>
        <Icon  name="calendar" className="size-4 text-poly-green-dark"/>
        Summer 2027
      </Button>
      <Button variant="white" className={filterClass}>
        <Icon
          name="chevron"
          className="size-4 text-poly-green-dark"
        />
        Any budget
      </Button>
      <Button variant="white" className={filterClass}>
        <Icon
          name="chevron"
          className="size-4 text-poly-green-dark"
        />
        Room or entire home
      </Button>
      <Button
        variant="white"
        className={`${filterClass} sm:ml-auto`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
          className="size-4 text-poly-green-dark">
          <path d="M3 6h7m4 0h7M3 12h12m4 0h2M3 18h3m4 0h11M10 3v6m5 0v6m-9 0v6" />
        </svg>
        More filters
      </Button>
    </section>
  );
}
