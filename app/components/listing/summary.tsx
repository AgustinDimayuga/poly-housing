import Textarea from "../textarea";
import Button from "../button";

export default function Listing_Summary() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-border-inputs w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-signup-title-green">
          $3,600 / month
        </h1>
        <p className="text-xs text-under-input">
          Entire home · available Sep 1, 2027
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mini-labels text-sm font-medium text-poly-green-dark">
          EK
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Emma Kim</p>
          <p className="text-xs text-under-input">
            Property owner · Cedar Rentals
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-xs">
        <p>emma@cedarrentals.example</p>
        <p>(805) 555-0142</p>
        <p className="text-under-input mt-1">
          Prefers messages · usually replies in 1–2 days
        </p>
      </div>

      <Textarea
        id="inquiry-message"
        className="h-28"
        defaultValue="Hi Emma, my roommates and I are interested in Cedar House for September 2027. Is a tour available?">
        Your message
      </Textarea>

      <div className="flex flex-col gap-3">
        <Button className="h-10" variant="primary">
          Send inquiry
        </Button>
        <Button className="h-10" variant="white">
          Start application
        </Button>
      </div>

      <p className="text-[11px] text-under-input">
        No payment is required to send an inquiry. Confirm lease
        terms with the owner before applying.
      </p>
    </div>
  );
}
