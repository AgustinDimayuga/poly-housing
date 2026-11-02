import type { Metadata } from "next";
import Button from "../components/button";
import Footer from "../components/browse-listings/footer";
import Icon from "../components/browse-listings/icon";
import SubleaseCard from "../components/subleasings/sublease-card";
import SubleaseFilters from "../components/subleasings/sublease-filters";
import { subleases } from "../components/subleasings/data";

export const metadata: Metadata = {
  title: "Student subleases in SLO | PolyHousing",
  description:
    "Explore student-posted rooms and homes in San Luis Obispo for the quarter or summer."
};

export default function SubleasingsPage() {
  return (
    <div className="min-h-screen bg-poly-green-light text-signup-title-green [font-family:Arial,Helvetica,sans-serif]">
      <main className="mx-auto max-w-400 px-5 pt-10 pb-11 sm:px-8 lg:px-10">
        <section
          aria-labelledby="subleases-title"
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1.5 text-[10px] font-bold text-poly-green-dark">
              STUDENT TO STUDENT
            </p>
            <h1
              id="subleases-title"
              className="text-[28px] leading-tight font-semibold tracking-[-0.6px] sm:text-[34px]">
              A place for the quarter. Or the summer.
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-under-input">
              Explore student-posted rooms and homes with clear
              start and end dates.
            </p>
          </div>
          <Button className="flex min-h-10 shrink-0 items-center justify-center gap-2 self-start px-4 text-[13px] font-semibold sm:self-center">
            <Icon name="plus" className="size-3.5" />
            Post a sublease
          </Button>
        </section>
        <SubleaseFilters />
        <section
          aria-labelledby="opportunities-title"
          className="mt-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="opportunities-title"
              className="text-[17px] font-semibold">
              18 student-posted opportunities
            </h2>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-under-input">
              Sort: Recently posted
              <Icon name="arrow" className="size-3 rotate-90" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 min-[600px]:grid-cols-2 lg:grid-cols-3">
            {subleases.map((sublease) => (
              <SubleaseCard
                key={sublease.id}
                sublease={sublease}
              />
            ))}
          </div>
        </section>
        <aside
          aria-label="Sublease reminder"
          className="mt-6 flex flex-col gap-4 rounded-xl bg-mini-labels p-[18px] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-xs leading-relaxed sm:items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
              className="mt-0.5 size-[18px] shrink-0 text-poly-green-dark sm:mt-0">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6m0-10v1" />
            </svg>
            Before committing, confirm dates, costs and the
            original lease’s sublease policy. Landlord approval
            may be required.
          </p>
          <Button
            variant="white"
            className="min-h-10 shrink-0 px-4 text-xs font-semibold text-signup-title-green">
            Sublease checklist
          </Button>
        </aside>
        <div className="mt-6 flex justify-center">
          <Button
            variant="white"
            className="min-h-10 px-4 text-[13px] font-semibold text-signup-title-green">
            Load more subleases
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
