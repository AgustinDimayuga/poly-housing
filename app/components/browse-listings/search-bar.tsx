import Button from "../button";
import Textbox from "../text";
import Icon from "./icon";

export default function SearchBar() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2.5 rounded-xl border border-border-inputs bg-white p-3">
      <div className="relative min-w-0 basis-full md:flex-1 md:basis-auto [&_label]:sr-only [&>div]:gap-0">
        <Icon
          name="search"
          className="pointer-events-none absolute top-3 left-3.5 text-poly-green-dark"
        />
        <Textbox
          id="browse-location"
          placeholder="San Luis Obispo, CA"
          className="h-10 w-full min-w-0 border-0! bg-poly-green-light! pl-10! text-xs">
          City, neighborhood, or address
        </Textbox>
      </div>
      <Button variant="white" disabled className="flex h-10 flex-1 items-center justify-center gap-2 px-3 text-xs font-medium md:flex-none">
        <Icon
          name="calendar"
          className="shrink-0 text-poly-green-dark"
        />
        Fall 2027
      </Button>
      <Button
        className="flex h-10 flex-1 items-center justify-center gap-2 px-4 text-xs font-semibold md:flex-none">
        <Icon name="arrow" />
        Search housing
      </Button>
    </div>
  );
}
