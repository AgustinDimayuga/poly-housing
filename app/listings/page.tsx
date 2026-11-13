

import Footer from "../components/browse-listings/footer";
import Icon from "../components/browse-listings/icon";
import ListingCard from "../components/browse-listings/listing-card";
import SearchBar from "../components/browse-listings/search-bar";
import Preferences from "../components/browse-listings/preferences";
import { requireUser } from "../shared/auth";

import { filterListingsfilters } from "./navbar";
// import { SearchParams } from "next/dist/server/request/search-params";

type SearchParams = Promise<{ // NEXT.js automatically reads and parses into the page and we define it here (search it up or Ask Miguel )
  max_price?: string;
  bedrooms?: string;
  move_in?: string;
}>;


export default async function BrowseListingsPage({searchParams,} : { searchParams : SearchParams}) {
  const user = await requireUser(); // logged-out users get sent to /login
   const sp = await searchParams;

   const listings = await filterListingsfilters({
    maxPrice: sp.max_price ? Number(sp.max_price) : undefined,
    bedrooms: sp.bedrooms ? Number(sp.bedrooms) : undefined,
    moveIn: sp.move_in || undefined,
  }); // fetch all listings from the API

  const total = listings.length; // get the total number of listings
  const visible = listings.slice(0,6); // get the first 6 listings to display

  return (
    <div className="min-h-screen bg-poly-green-light text-signup-title-green [font-family:Arial,Helvetica,sans-serif]">
      <main className="mx-auto  px-5 pt-10 pb-10 sm:px-8 lg:px-10">

        {/* title part of the page (with search bar) */}
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

         {/* end of the title and search bar */}


        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Preferences current={{
            maxPrice: sp.max_price ?? "",
            bedrooms: sp.bedrooms ?? "",
            moveIn: sp.move_in ?? "",
          }}/>
          <section
            className="min-w-0"
            aria-label="Housing results">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold sm:text-[17px]">
                  {total} homes for Fall 2027
                </h2>
                <p className="mt-1 text-[11px] text-under-input">
                 {total == 0 ? "No homes found" : `showing ${visible.length} of ${total} in San Luis Obispo`}
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

            <div className="grid grid-cols-1 gap-4 min-[540px]:grid-cols-2 lg:grid-cols-3 mt-5">
              {visible.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
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
