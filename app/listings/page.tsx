import type { Metadata } from "next";
import { homes } from "../components/browse-listings/data";
import Footer from "../components/browse-listings/footer";
import Icon from "../components/browse-listings/icon";
import ListingCard from "../components/browse-listings/listing-card";
import Preferences from "../components/browse-listings/preferences";
import SearchBar from "../components/browse-listings/search-bar";

export const metadata: Metadata = {
  title: "Find housing in SLO | PolyHousing",
  description:
    "Explore student-friendly homes, apartments, and studios near Cal Poly in San Luis Obispo."
};

export default function BrowseListingsPage() {
  return (
    <div className="min-h-screen bg-poly-green-light text-signup-title-green [font-family:Arial,Helvetica,sans-serif]">
      <main className="mx-auto  px-5 pt-10 pb-10 sm:px-8 lg:px-10">
        <section aria-labelledby="browse-title">
          <p className="mb-1.5 text-[10px] font-bold text-poly-green-dark">
            OFF CAMPUS. ON YOUR TERMS.
          </p>
          <h1
            id="browse-title"
            className="mb-2 text-[28px] leading-tight font-semibold tracking-[-0.6px] sm:text-[34px]">
            Find your next place in SLO.
          </h1>
          <p className="text-[13px] leading-relaxed text-under-input">
            Housing that welcomes students, with move-in dates
            that fit your plans.
          </p>
        </section>
        <SearchBar />
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Preferences />
          <section
            className="min-w-0"
            aria-label="Housing results">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold sm:text-[17px]">
                  24 homes for Fall 2027
                </h2>
                <p className="mt-1 text-[11px] text-under-input">
                  Showing 6 of 24 · San Luis Obispo
                </p>
              </div>
              <div className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border-inputs bg-white px-2.5 text-xs font-medium sm:px-4">
                <Icon
                  name="chevron"
                  className="size-3 text-poly-green-dark"
                />
                Sort: Best match
              </div>
            </div>
            <div className="mt-4 mb-4 flex flex-wrap gap-2">
              {[
                "Students welcome",
                "Fall move-in ×",
                "Up to $4,500 ×"
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-medium text-poly-green-dark">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 min-[540px]:grid-cols-2 lg:grid-cols-3">
              {homes.slice(0, 6).map((home) => (
                <ListingCard key={home.id} home={home} />
              ))}
            </div>
            <nav
              aria-label="Results pages"
              className="mt-4 flex justify-center gap-2.5">
              {[1, 2, 3, 4].map((page) => (
                <span
                  key={page}
                  aria-current={page === 1 ? "page" : undefined}
                  className={`grid size-10 place-items-center rounded-md border text-xs font-medium ${page === 1 ? "border-poly-green-dark bg-poly-green-dark text-white" : "border-border-inputs bg-white"}`}>
                  {page}
                </span>
              ))}
              <span className="flex h-10 items-center gap-2 rounded-md border border-border-inputs bg-white px-4 text-xs font-medium">
                <Icon
                  name="chevron"
                  className="size-3 -rotate-90 text-poly-green-dark"
                />
                Next
              </span>
            </nav>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
