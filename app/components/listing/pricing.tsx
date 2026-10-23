type PricingItem = {
  label: string;
  amount: string;
};

export type ListingPricingProps = {
  rentLabel: string;
  baseRent: string;
  availability: string;
  estimatedMonthlyTotal: string;
  estimateDescription: string;
  includedCosts: PricingItem[];
  separateCosts: PricingItem[];
  fees: PricingItem[];
  note?: string;
};

export default function ListingPricing({
  rentLabel,
  baseRent,
  availability,
  estimatedMonthlyTotal,
  estimateDescription,
  includedCosts,
  separateCosts,
  fees,
  note
}: ListingPricingProps) {
  return (
    <section
      aria-labelledby="listing-pricing-title"
      className="rounded-2xl border border-border-inputs bg-white p-6 text-signup-title-green">
      <h2
        id="listing-pricing-title"
        className="text-xl font-bold">
        Know what you’ll pay
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-under-input">
            {rentLabel}
          </p>
          <p className="mt-3 text-3xl font-bold">{baseRent}</p>
          <p className="mt-4 text-sm font-semibold">
            {availability}
          </p>
        </div>
        <div className="rounded-xl bg-mini-labels p-5">
          <p className="text-xs uppercase">
            Estimated monthly total
          </p>
          <p className="mt-3 text-3xl font-bold">
            {estimatedMonthlyTotal}
          </p>
          <p className="mt-3 text-sm">{estimateDescription}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border-inputs pt-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold">
            Included in rent
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            {includedCosts.map(({ label, amount }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4">
                <dt>{label}</dt>
                <dd className="shrink-0 text-right font-semibold">
                  {amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="text-sm font-semibold">
            Paid separately by residents
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            {separateCosts.map(({ label, amount }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4">
                <dt>{label}</dt>
                <dd className="shrink-0 text-right font-semibold">
                  {amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {fees.length > 0 && (
        <dl className="mt-6 space-y-5 border-t border-border-inputs pt-6 text-sm">
          {fees.map(({ label, amount }) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-4">
              <dt>{label}</dt>
              <dd className="text-right font-semibold">
                {amount}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {note && (
        <p className="mt-6 text-xs leading-relaxed text-under-input">
          {note}
        </p>
      )}
    </section>
  );
}
