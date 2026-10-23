import Title from "../components/listing/titles";
import Bubble_text from "../components/bubble";
import Button from "../components/button";
import Image from "next/image";
import Listing_Summary from "../components/listing/summary";
import ImportantInformation from "../components/listing/important-information";
import ListingPricing from "../components/listing/pricing";
import type { ListingPricingProps } from "../components/listing/pricing";
import ListingReviews from "../components/listing/reviews";
import type { ListingReviewsProps } from "../components/listing/reviews";

const listingReviews: ListingReviewsProps = {
  averageRating: 4.6,
  reviewCount: 8,
  reviews: [
    {
      id: "maya-r",
      name: "Maya R.",
      residency: "Lived here Sep 2025 – Aug 2026",
      rating: 5,
      comment:
        "The shared spaces made living with roommates easy. Our landlord replied quickly when the dryer stopped working. Budget a little extra for winter gas bills."
    },
    {
      id: "alex-t",
      name: "Alex T.",
      residency: "Lived here Sep 2024 – Aug 2025",
      rating: 4,
      comment:
        "Quiet street and a manageable bike ride to campus. The rooms vary in size, so we agreed on the rent split before signing."
    }
  ],
  note: "Reviews reflect residents’ personal experiences, not a property inspection."
};

const listingPricing: ListingPricingProps = {
  rentLabel: "Base rent · entire home",
  baseRent: "$3,600 / month",
  availability: "Available Sep 1, 2027",
  estimatedMonthlyTotal: "$3,750–$3,830",
  estimateDescription: "Rent + estimated extra utilities",
  includedCosts: [
    { label: "Water & sewer", amount: "Included" },
    { label: "Trash collection", amount: "Included" },
    { label: "Two parking spaces", amount: "Included" }
  ],
  separateCosts: [
    { label: "Electricity & gas", amount: "Est. $100–$160/mo" },
    { label: "Internet", amount: "Est. $50–$70/mo" },
    { label: "Renter’s insurance", amount: "Provider varies" }
  ],
  fees: [
    {
      label: "Refundable security deposit",
      amount: "$3,600 · one time"
    },
    { label: "Application fee", amount: "$35 per applicant" }
  ],
  note: "Estimates are landlord-provided for the entire home, not a quote. Usage and provider rates may vary; insurance is not included in the total above."
};

export default function ListingPage() {
  return (
    <div className="bg-poly-green-light min-h-screen">
      <div className="mx-auto max-w-7xl py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Title address="1248 Cedar St, San Luis Obispo, CA 93405 · Anholm">
              Cedar House
            </Title>
            <div className="flex flex-row gap-3 mt-5">
              <Bubble_text variant="Message">
                Students welcome
              </Bubble_text>
              <Bubble_text variant="Message">
                Available Sep 1, 2027
              </Bubble_text>
              <Bubble_text
                variant="Review"
                rating={4.6}
                reviews={8}>
                Hello
              </Bubble_text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="white" className="w-28 h-12">
              Share
            </Button>
            <Button variant="white" className="w-28 h-12">
              Save
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid h-[350px] grid-cols-3 grid-rows-2 gap-3">
          <div className="relative col-span-2 row-span-2">
            <Image
              src="/polyhouse-signup.jpg"
              alt="Front of house"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/polyhouse-signup.jpg"
              alt="Living room"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/polyhouse-signup.jpg"
              alt="Kitchen"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Main + sidebar */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-border-inputs p-6">
              <p className="text-sm font-semibold">
                3 bedrooms · 2 bathrooms · 2 parking spaces
              </p>
              <h2 className="mt-4 text-xl font-bold">
                A little more room for your college years.
              </h2>
              <p className="mt-2 text-sm text-under-input">
                A bright, single-story home in Anholm with a
                shared living room, sunny backyard and room for
                a dining table. A bike-friendly route connects
                to campus and downtown.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Bubble_text variant="Message">
                  In-unit laundry
                </Bubble_text>
                <Bubble_text variant="Message">
                  Private backyard
                </Bubble_text>
                <Bubble_text variant="Message">
                  Dishwasher
                </Bubble_text>
                <Bubble_text variant="Message">
                  Bike storage
                </Bubble_text>
              </div>
            </div>
            <ImportantInformation viewerRole="user" />
            <ListingPricing {...listingPricing} />
            <ListingReviews
              {...listingReviews}
              action={
                <Button
                  variant="white"
                  className="flex items-center gap-2 px-4 py-3 font-semibold !text-signup-title-green">
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path />
                  </svg>
                  Write a review
                </Button>
              }
            />
          </div>

          <aside>
            <Listing_Summary />
          </aside>
        </div>
      </div>
    </div>
  );
}
