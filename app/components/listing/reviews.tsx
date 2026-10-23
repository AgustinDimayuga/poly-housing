import type { ReactNode } from "react"

type ResidentReview = {
    id: string
    name: string
    residency: string
    rating: number
    comment: string
}

export type ListingReviewsProps = {
    averageRating: number
    reviewCount: number
    reviews: ResidentReview[]
    action?: ReactNode
    note?: string
}

export default function ListingReviews({
    averageRating,
    reviewCount,
    reviews,
    action,
    note,
}: ListingReviewsProps) {
    return (
        <section aria-labelledby="listing-reviews-title" className="rounded-2xl border border-border-inputs bg-white p-6 text-signup-title-green">
            <h2 id="listing-reviews-title" className="text-xl font-bold">What residents say</h2>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-border-inputs pb-6">
                <div aria-label={`${averageRating.toFixed(1)} out of 5 stars`} className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                    <span aria-hidden="true" className="relative inline-block text-3xl tracking-wider leading-none text-border-inputs">
                        ★★★★★
                        <span className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#AC7931]" style={{ width: `${Math.min(5, Math.max(0, averageRating)) / 5 * 100}%` }}>
                            ★★★★★
                        </span>
                    </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm text-under-input">{reviewCount} resident {reviewCount === 1 ? "review" : "reviews"}</p>
                    {action}
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-sm text-under-input">No resident reviews yet.</p>
                ) : reviews.map(({ id, name, residency, rating, comment }) => (
                    <article key={id} className="text-sm">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-semibold">{name}</h3>
                            <p aria-label={`${rating.toFixed(1)} out of 5 stars`} className="shrink-0 font-semibold">
                                <span aria-hidden="true">★ {rating.toFixed(1)}</span>
                            </p>
                        </div>
                        <p className="mt-2 text-under-input">{residency}</p>
                        <p className="mt-3 leading-relaxed">{comment}</p>
                    </article>
                ))}
            </div>

            {note && <p className="mt-6 text-xs leading-relaxed text-under-input">{note}</p>}
        </section>
    )
}
