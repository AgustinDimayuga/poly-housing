import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/browse-listings/footer";
import ReviewPropertyCard from "../components/reviews/property-card";
import ReviewForm from "../components/reviews/review-form";

export const metadata: Metadata = {
  title: "Write a review · Cedar House · PolyHousing",
  description:
    "Share your experience living at Cedar House and help the next student make an informed choice."
};

export default function ReviewsPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#f7f8f4] font-[Arial,sans-serif] text-signup-title-green">
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-5 pb-10 pt-8 sm:px-8 sm:pt-11 lg:px-10">
          <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2.5 text-[11px] text-under-input">
          <Link href="/listing" className="hover:underline">
            Cedar House
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/listing#listing-reviews-title"
            className="hover:underline">
            Resident reviews
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Write a review</span>
        </nav>
        <div className="mb-6 mt-7">
          <p className="text-[10px] font-bold text-poly-green-dark">
            SHARE YOUR LIVED EXPERIENCE
          </p>
          <h1 className="mt-1.5 text-[27px] leading-tight font-semibold sm:text-[32px]">
            Help the next student make an informed choice.
          </h1>
          <p className="mt-2 text-[13px] leading-5 text-under-input">
            Tell students what living here was like
          </p>
        </div>
        <div className="grid items-start gap-7 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[288px_minmax(0,1fr)]">
          <ReviewPropertyCard />
          <ReviewForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
