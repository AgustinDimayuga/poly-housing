import Image from "next/image";

export default function ReviewPropertyCard() {
  return (
    <aside className="min-w-0">
      <div className="rounded-[10px] border border-border-inputs bg-white p-5">
        <div className="relative aspect-[5/3] overflow-hidden rounded-[9px]">
          <Image
            src="/polyhouse-signup.jpg"
            alt="Cedar House, a craftsman home with a landscaped front garden"
            fill
            sizes="(min-width: 768px) 246px, (min-width: 640px) 480px, 90vw"
            className="object-cover"
          />
        </div>
        <span className="mt-4 inline-block rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-semibold text-poly-green-dark">
          You’re reviewing this property
        </span>
        <h2 className="mt-5 text-xl font-semibold">
          Cedar House
        </h2>
        <p className="mt-4 text-xs leading-5 text-under-input">
          1248 Cedar St, San Luis Obispo
        </p>
        <p className="mt-4 text-xs">
          3 beds · 2 baths · Anholm
        </p>
        <p className="mt-5 border-t border-border-inputs pt-5 text-xs">
          Current listing: $3,600 / month
        </p>
      </div>
      <p className="mt-4 text-[11px] leading-[17px] text-under-input">
        Reviews are personal experiences, not verified safety
        assessments.
      </p>
    </aside>
  );
}
