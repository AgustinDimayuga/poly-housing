import Image from "next/image";
import Button from "../button";
import Textarea from "../textarea";
import {
  Checkbox,
  Field,
  Icon,
  Section,
  SelectField
} from "./form-fields";

const values: Record<string, string> = {
  title: "Cedar House",
  propertyType: "House",
  address: "1248 Cedar St",
  city: "San Luis Obispo",
  state: "California",
  zip: "93405",
  bedrooms: "3",
  bathrooms: "2",
  area: "1,420 sq ft",
  description:
    "A bright, single-story home in Anholm with a shared living room, sunny backyard and room for a dining table. Student roommates and co-signers are welcome.",
  laundry: "yes",
  dishwasher: "yes",
  bikeStorage: "yes",
  backyard: "yes",
  parking: "yes",
  pets: "no",
  students: "yes",
  available: "2027-09-01",
  leaseLength: "12 months",
  leaseEnd: "2028-08-31",
  residents: "3",
  cosigners: "yes",
  flexible: "no",
  requirements:
    "Each applicant completes an application. Co-signers are welcome. Ask about a tour before submitting an application.",
  rent: "3600",
  deposit: "3600",
  applicationFee: "35",
  water: "yes",
  trash: "yes",
  parkingIncluded: "yes",
  electricity: "no",
  gas: "no",
  internet: "no",
  electricityEstimate: "$100–$160",
  internetEstimate: "$50–$70",
  insurance: "Renter’s insurance · provider varies",
  recurring: "$0",
  costNotes:
    "Utility estimates are for the entire home. Electricity and gas are billed by usage. Residents arrange their own internet and renter’s insurance.",
  role: "Property owner",
  contactName: "Emma Kim",
  business: "Cedar Rentals",
  phone: "(805) 555-0142",
  email: "emma@cedarrentals.example",
  contactMethod: "PolyHousing message",
  applicationDestination: "Request application by message",
  showContact: "yes",
  authorized: "yes",
  guidelines: "yes"
};

type Photo = { src: string; alt: string };
const photos: Photo[] = [
  { src: "/posting/cedar-house.jpg", alt: "House exterior" },
  {
    src: "/posting/living-room.jpg",
    alt: "Bright shared living room"
  },
  {
    src: "/posting/kitchen.jpg",
    alt: "Kitchen and dining space"
  }
];
const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-xs font-semibold transition-colors hover:bg-poly-green-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poly-green-dark";
const textareaClass =
  "min-h-24 text-sm font-normal leading-relaxed outline-none focus:border-poly-green-dark focus:ring-2 focus:ring-poly-green-dark/15";

function field(key: string) {
  return { id: key, name: key, defaultValue: values[key] };
}

function checkbox(key: string) {
  return { name: key, defaultChecked: values[key] === "yes" };
}

const checklist = [
  "Property details complete",
  "3 photos added",
  "Student applicants welcome",
  "Full move-in date set",
  "Utilities & fees disclosed",
  "Contact details added"
];

export default function CreatePostingForm() {
  function listingPreview() {
    return (
      <>
        {photos[0] ? (
          <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              sizes="(max-width: 1024px) 90vw, 280px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mb-5 rounded-lg bg-poly-green-light p-8 text-center text-sm text-under-input">
            Add a cover photo
          </div>
        )}
        {values.students === "yes" && (
          <span className="rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-semibold text-poly-green-dark">
            Student applicants welcome
          </span>
        )}
        <p className="mt-5 text-2xl font-semibold tracking-tight">
          $3,600{" "}
          <span className="text-lg font-medium">/ month</span>
        </p>
        <h3 className="mt-5 text-base font-semibold">
          {values.title || "Your property name"}
        </h3>
        <p className="mt-4 text-xs leading-5 text-under-input">
          {values.address} · {values.city}
        </p>
        <p className="mt-4 text-xs">
          {values.bedrooms} beds · {values.bathrooms} baths ·{" "}
          {values.area}
        </p>
        <div className="mt-5 space-y-3 border-t border-border-inputs pt-5 text-xs text-under-input">
          <p className="text-signup-title-green">
            Available September 1, 2027
          </p>
          <p>
            Water, sewer & trash{" "}
            {values.water === "yes" && values.trash === "yes"
              ? "included"
              : "billed separately"}
          </p>
          <p>
            3 rent inclusions ·{" "}
            {values.leaseLength.toLowerCase()} lease
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pt-12">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-poly-green-dark">
            FOR HOMEOWNERS & REALTORS
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make room for students.
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-under-input">
            Share the home, the timing and the full cost. All
            PolyHousing listings must accept student applicants.
          </p>
        </div>
        <Button variant="white" className={buttonClass}>
          <Icon name="save" /> Save draft
        </Button>
      </div>

      <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-mini-labels px-5 py-4 text-xs">
        <div className="flex flex-wrap items-center gap-5">
          <span className="font-semibold text-poly-green-dark">
            Draft
          </span>
          <span>
            {values.title || "Untitled listing"} · Your listing
            is not published yet.
          </span>
        </div>
        <span className="text-under-input">
          Last saved: just now
        </span>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0 space-y-6">
          <Section title="Property details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Listing title *"
                {...field("title")}
                required
              />
              <SelectField
                label="Property type *"
                {...field("propertyType")}
                required>
                {[
                  "House",
                  "Apartment",
                  "Condo",
                  "Townhouse",
                  "Private room"
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectField>
            </div>
            <Field
              label="Street address *"
              {...field("address")}
              autoComplete="street-address"
              required
            />
            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="City *"
                {...field("city")}
                autoComplete="address-level2"
                required
              />
              <Field
                label="State *"
                {...field("state")}
                autoComplete="address-level1"
                required
              />
              <Field
                label="ZIP code *"
                {...field("zip")}
                autoComplete="postal-code"
                pattern="[0-9]{5}(-[0-9]{4})?"
                required
              />
              <Field
                label="Bedrooms *"
                {...field("bedrooms")}
                type="number"
                min="0"
                required
              />
              <Field
                label="Bathrooms *"
                {...field("bathrooms")}
                type="number"
                min="0"
                step="0.5"
                required
              />
              <Field label="Floor area" {...field("area")} />
            </div>
            <Textarea
              {...field("description")}
              required
              className={textareaClass}>
              Describe the home *
            </Textarea>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {[
                ["laundry", "In-unit laundry"],
                ["dishwasher", "Dishwasher"],
                ["bikeStorage", "Bike storage"],
                ["backyard", "Private backyard"],
                ["parking", "Parking · 2 spaces"],
                ["pets", "Pets allowed"]
              ].map(([key, label]) => (
                <Checkbox key={key} {...checkbox(key)}>
                  {label}
                </Checkbox>
              ))}
            </div>
          </Section>

          <Section title="Photos">
            <p className="text-xs leading-5 text-under-input">
              Show bedrooms, shared spaces and the exterior. Add
              at least 3 clear photos.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={`${photo.src}-${index}`}
                  className="group relative aspect-[1.7] overflow-hidden rounded-lg bg-poly-green-light">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 28vw, 250px"
                    className="object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-border-inputs p-4">
              <p className="flex items-center gap-3 text-xs text-under-input">
                <Icon
                  name="upload"
                  className="size-5 shrink-0 text-poly-green-dark"
                />
                Drag photos here or choose files · JPG or PNG,
                up to 10 MB each
              </p>
              <Button variant="white" className={buttonClass}>
                Add photos
              </Button>
            </div>
            <p className="text-[11px] text-under-input">
              First photo selected as cover · {photos.length}{" "}
              photos added
            </p>
          </Section>

          <Section title="Student eligibility & availability">
            <div className="rounded-lg bg-mini-labels p-4">
              <Checkbox {...checkbox("students")} required>
                This property accepts undergraduate and graduate
                student applicants. *
              </Checkbox>
              <p className="ml-6 mt-1 text-[11px] text-under-input">
                Student eligibility is required to publish on
                PolyHousing.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Available from *"
                {...field("available")}
                type="date"
                required
              />
              <SelectField
                label="Lease length *"
                {...field("leaseLength")}>
                {[
                  "12 months",
                  "9 months",
                  "6 months",
                  "Month-to-month"
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectField>
              <Field
                label="Lease ends"
                {...field("leaseEnd")}
                type="date"
                min={values.available}
              />
              <Field
                label="Maximum residents *"
                {...field("residents")}
                type="number"
                min="1"
                required
              />
            </div>
            <div className="space-y-3">
              <Checkbox {...checkbox("cosigners")}>
                Co-signers / guarantors accepted
              </Checkbox>
              <Checkbox {...checkbox("flexible")}>
                Move-in date is flexible
              </Checkbox>
            </div>
            <Textarea
              {...field("requirements")}
              className={textareaClass}>
              Application & lease requirements
            </Textarea>
          </Section>

          <Section title="Rent, utilities & extra expenses">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="Monthly rent · entire home *"
                {...field("rent")}
                type="number"
                min="0"
                required
              />
              <Field
                label="Refundable security deposit *"
                {...field("deposit")}
                type="number"
                min="0"
                required
              />
              <Field
                label="Application fee · per person"
                {...field("applicationFee")}
                type="number"
                min="0"
              />
            </div>
            <div className="space-y-4 border-t border-border-inputs pt-5">
              <h3 className="text-xs font-semibold">
                What’s included in rent?
              </h3>
              <p className="text-xs text-under-input">
                Checked items are included. Enter monthly
                estimates for items paid separately.
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                {[
                  ["water", "Water & sewer"],
                  ["trash", "Trash"],
                  ["parkingIncluded", "Parking"],
                  ["electricity", "Electricity"],
                  ["gas", "Gas"],
                  ["internet", "Internet"]
                ].map(([key, label]) => (
                  <Checkbox key={key} {...checkbox(key)}>
                    {label}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Electricity & gas · monthly estimate"
                {...field("electricityEstimate")}
              />
              <Field
                label="Internet · monthly estimate"
                {...field("internetEstimate")}
              />
              <Field
                label="Other required expense"
                {...field("insurance")}
              />
              <Field
                label="Other recurring fees"
                {...field("recurring")}
              />
            </div>
            <Textarea
              {...field("costNotes")}
              className={textareaClass}>
              Cost notes for students
            </Textarea>
            <div className="flex flex-wrap justify-between gap-2 rounded-lg bg-mini-labels px-4 py-4 text-xs font-semibold">
              <span>Estimated monthly total</span>
              <span>$3,750–$3,830 + insurance</span>
            </div>
          </Section>

          <Section title="Contact & application details">
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Your role *"
                {...field("role")}>
                {[
                  "Property owner",
                  "Property manager",
                  "Realtor"
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectField>
              <Field
                label="Contact name *"
                {...field("contactName")}
                autoComplete="name"
                required
              />
              <Field
                label="Business / organization"
                {...field("business")}
                autoComplete="organization"
              />
              <Field
                label="Phone number *"
                {...field("phone")}
                type="tel"
                autoComplete="tel"
                required
              />
            </div>
            <Field
              label="Contact email *"
              {...field("email")}
              type="email"
              autoComplete="email"
              required
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Preferred contact method"
                {...field("contactMethod")}>
                {["PolyHousing message", "Email", "Phone"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </SelectField>
              <SelectField
                label="Application destination"
                {...field("applicationDestination")}>
                {[
                  "Request application by message",
                  "Request application by email"
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectField>
            </div>
            <div className="space-y-3">
              <Checkbox {...checkbox("showContact")}>
                Show my email and phone on the listing
              </Checkbox>
              <p className="text-[11px] leading-5 text-under-input">
                Students can send inquiries from your listing.
                Only share contact details you want publicly
                visible.
              </p>
            </div>
          </Section>

          <section
            className="space-y-4 rounded-xl border border-border-inputs bg-white p-5 sm:p-6"
            aria-label="Review and publish">
            <Checkbox {...checkbox("authorized")} required>
              I’m authorized to list this property and the
              information above is accurate. *
            </Checkbox>
            <Checkbox {...checkbox("guidelines")} required>
              I agree to the listing guidelines and will
              consider student applicants. *
            </Checkbox>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="text-[11px] text-under-input">
                * Required field
              </p>
              <div className="flex gap-3">
                <Button variant="white" className={buttonClass}>
                  Preview listing
                </Button>
                <Button
                  type="button"
                  className={`${buttonClass} hover:bg-green-button-click`}>
                  <Icon name="arrow" /> Publish listing
                </Button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-6">
          <section className="rounded-xl border border-border-inputs bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold tracking-tight">
              Your listing preview
            </h2>
            {listingPreview()}
          </section>
          <section className="rounded-xl border border-border-inputs bg-white p-5">
            <h2 className="mb-5 text-base font-semibold">
              Before you publish
            </h2>
            <ul className="space-y-4">
              {checklist.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-xs">
                  <span className="text-poly-green-dark">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </section>
          <section className="space-y-3 rounded-xl bg-[#efecdf] p-5">
            <Icon
              name="bulb"
              className="size-5 text-poly-green-dark"
            />
            <h2 className="text-sm font-semibold">
              Be specific about timing.
            </h2>
            <p className="text-xs leading-5 text-under-input">
              Students often plan a quarter or more ahead. Clear
              lease dates and full costs help them decide
              whether your home fits.
            </p>
          </section>
          <p className="px-1 text-[11px] leading-5 text-under-input">
            Need help? Review the required details in the
            checklist above.
          </p>
        </aside>
      </div>
    </div>
  );
}
