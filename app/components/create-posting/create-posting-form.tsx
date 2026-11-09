'use client'

import Image from "next/image";
import Button from "../button";
import Textarea from "../textarea";
import React from "react";
import { SubmitEvent } from "react";
import { redirect } from "next/navigation";

import {
  Checkbox,
  Field,
  Icon,
  Section,
  SelectField
} from "./form-fields";


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
  return { id: key, name: key };
}

function checkbox(key: string) {
  return { name: key };
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

  const [rent, setRent] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState(0);
  const [bathrooms, setBathrooms] = React.useState(0);
  const [area, setArea] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date("january 1 2026"));

  const [leaseLength, setLeaseLength] = React.useState("12 months")

  const [ifError, setError] = React.useState("")

  async function submitListing(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    //time to do a lot of grabbing

    const formData = new FormData(event.currentTarget);

    const rent = formData.get("rent");
    const title = formData.get("title");
    const address = formData.get("address");
    const city = formData.get("city");
    const bedrooms = formData.get("bedrooms");
    const bathrooms = formData.get("bathrooms");
    const area = formData.get("area")
    const propertyType = formData.get("propertyType");

    //thinking it might be redundant as we are catering to cal poly students
    const state = formData.get("state");

    const zip = formData.get("zip");
    const description = formData.get("description");
    // const amenities = {
    //   "laundry": formData.get("laundry") === "on",
    //   "dishwasher": formData.get("dishwater") === "on",
    //   "bikeStorage": formData.get("bikeStorage") === "on",
    //   "backyard": formData.get("backyard") === "on",
    //   "parking": formData.get("parking") === "on",
    //   "pets": formData.get("pets") === "on"
    // }
    const amenities = [
      formData.get("laundry") === "on" ? "laundry" : null,
      formData.get("dishwater") === "on" ? "dishwater" : null,
      formData.get("bikeStorage") === "on" ? "bikeStorage" : null,
      formData.get("backyard") === "on" ? "backyard" : null,
      formData.get("parking") === "on" ? "parking" : null,
      formData.get("pets") === "on" ? "pets" : null
  ]

    const startDate = formData.get("available");
    const endDate = formData.get("leaseEnd");
    const leaseLength = formData.get("leaseLength");
    const residents = formData.get("residents");
    const cosigners = formData.get("cosigners");
    const flexible = formData.get("flexible");
    const requirements = formData.get("requirements");
    const deposit = formData.get("deposit");
    const applicationFee = formData.get("applicationFee");


    // const utilities = {
    //   "water": formData.get("water") === "on",
    //   "trash": formData.get("trash") === "on",
    //   "parkingIncluded": formData.get("parkingIncluded") === "on",
    //   "electricity": formData.get("electricity") === "on",
    //   "gas": formData.get("gas") === "on",
    //   "internet": formData.get("internet") === "on"
    // }


    const utilities = [
      formData.get("water") === "on" ? "water" : null,
      formData.get("trash") === "on" ? "trash" : null,
      formData.get("parkingIncluded") === "on" ? "parkingIncluded" : null,
      formData.get("electricity") === "on" ? "electricity" : null,
      formData.get("gas") === "on" ? "gas" : null,
      formData.get("internet") === "on" ? "internet" : null
    ]

    const utilityCost = {
      "electricity and gas": formData.get("electricityEstimate"),
      "internet": formData.get("internetEstimate"),
      "otherRequired": formData.get("insurance"),
      "recurring": formData.get("recurring")
    }

    const costNotes = formData.get("costNotes");
    const role = formData.get("role");
    const contactName = formData.get("contactName");
    const business = formData.get("business");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const contactMethod = formData.get("contactMethod");
    const applicationDestination = formData.get("applicationDestination");
    const showContact = formData.get("showContact");
    const authorized = formData.get("authorized");
    const guidelines = formData.get("guidelines");

    const students = formData.get("students");

    // need to update the listings table to cover more data
    const listingData = {
      posterId: 123,
      campus: "why do we need this??",
      city: city,
      type: propertyType,
      bedroom: bedrooms,
      bathroom: bathrooms,
      square_ft: area,
      monthly_price: rent,
      available_from: startDate,
      available_to: endDate,
      status: "pending idk",
      address: address,
      description: description,
      amenities: amenities.map((am) => am !== null)
    }

    const response = await fetch("http://127.0.0.1:8000/listings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listingData)
    })

    if(response.status === 201){
      setError("")
      redirect("/listings")
    } else {
      setError("Could not create listing");
      return
    }
  }

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
        {/* {values.students === "yes" && (
          <span className="rounded-full bg-mini-labels px-2.5 py-1 text-[10px] font-semibold text-poly-green-dark">
            Student applicants welcome
          </span>
        )} */}
        <p className="mt-5 text-2xl font-semibold tracking-tight">
          {/* $3,600{" "} */}
          ${rent} {" "}
          <span className="text-lg font-medium">/ month</span>
        </p>
        <h3 className="mt-5 text-base font-semibold">
          {title || "Your property name"}
        </h3>
        <p className="mt-4 text-xs leading-5 text-under-input">
          {address} · {city}
        </p>
        <p className="mt-4 text-xs">
          {bedrooms} beds · {bathrooms} baths ·{" "}
          {area} sqr ft
        </p>
        <div className="mt-5 space-y-3 border-t border-border-inputs pt-5 text-xs text-under-input">
          <p className="text-signup-title-green">
            {/* Available September 1, 2027 */}
            Available {`${startDate.toLocaleString('en-US', {month : "long"})} ${startDate.toLocaleString('en-US', {day : "numeric"})}, ${startDate.getFullYear()}`}
          </p>
          {/* <p>
            Water, sewer & trash{" "}
            {values.water === "yes" && values.trash === "yes"
              ? "included"
              : "billed separately"}
          </p> */}
          <p>
            3 rent inclusions ·{" "}
            {/* {values.leaseLength.toLowerCase()} lease */}
            {leaseLength} lease
          </p>
        </div>
      </>
    );
  }

  return (

    // <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pt-12">
    <form className="mx-auto max-w-[1320px] px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pt-12" onSubmit={submitListing}>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-poly-green-dark">
            FOR HOMEOWNERS & REALTORS
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make room for students.
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-under-input mb-2">
            Add details about the property. All
            PolyHousing listings must accept student applicants.
          </p>
        </div>
        <Button variant="white" className={buttonClass}>
          <Icon name="save" /> Save draft
        </Button>
      </div>

      {/* Not sure you guys want to have a save draft feature implement or not */}

      {/* <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-mini-labels px-5 py-4 text-xs">
        <div className="flex flex-wrap items-center gap-5">
          <span className="font-semibold text-poly-green-dark">
            Draft
          </span>
          <span>
            {title || "Untitled listing"} · Your listing
            is not published yet.
          </span>
        </div>
        <span className="text-under-input">
          Last saved: just now
        </span>
      </div> */}

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0 space-y-6">
          <Section title="Property details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Listing title *"
                {...field("title")}
                onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="City *"
                {...field("city")}
                autoComplete="address-level2"
                onChange={(e) => setCity(e.target.value)}
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
                defaultValue={0}
                onChange={(e) => setBedrooms(e.target.valueAsNumber)}
                required
              />
              <Field
                label="Bathrooms *"
                {...field("bathrooms")}
                type="number"
                min="0"
                step="0.5"
                defaultValue={0}
                onChange={(e) => setBathrooms(e.target.valueAsNumber)}
                required
              />
              <Field label="Floor area"
              {...field("area")}
              onChange={(e) => setArea(e.target.valueAsNumber)}
              />
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
              {/* need to add file uploading */}

              {/* {photos.map((photo, index) => (
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
              ))} */}
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
                onChange={(e) => {
                  const setDate = e.target.valueAsDate;
                  if(setDate === null){
                    setStartDate(new Date("January 1 2026"))
                  } else {
                    setStartDate(setDate)
                  }

                }}
                required
              />
              <SelectField
                label="Lease length *"
                {...field("leaseLength")}
                onChange={(e) => setLeaseLength(e.target.value)}
                >
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
                min={startDate.toDateString()}
              />
              <Field
                label="Maximum residents *"
                {...field("residents")}
                type="number"
                min="1"
                defaultValue={1}
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
                defaultValue={0}
                onChange={(e) => {
                  const changeRent = e.target.valueAsNumber;
                  Number.isNaN(changeRent) ? setRent(0) : setRent(changeRent);
                }}
                required
              />
              <Field
                label="Refundable security deposit *"
                {...field("deposit")}
                type="number"
                min="0"
                defaultValue={0}
                required
              />
              <Field
                label="Application fee · per person"
                {...field("applicationFee")}
                type="number"
                min="0"
                defaultValue={0}
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
                  type="submit"
                  className={`${buttonClass} hover:bg-green-button-click`}>
                  <Icon name="arrow" /> Publish listing
                </Button>
              </div>
            </div>
            {ifError && <p className="text-red-500 text-sm">{ifError}</p>}
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-6">
          <section className="rounded-xl border border-border-inputs bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold tracking-tight">
              Your listing preview
            </h2>
            {listingPreview()}
          </section>
          {/* <section className="rounded-xl border border-border-inputs bg-white p-5">
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
          </section> */}
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
    {/* </div> */}
    </form>
  );
}
