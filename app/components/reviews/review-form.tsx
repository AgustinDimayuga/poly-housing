"use client"

import { useActionState, type ReactNode } from "react";
import Link from "next/link";
import Button from "../button";
import Textbox from "../text";
import Textarea from "../textarea";
import Icon from "../browse-listings/icon";
import React from "react";
import { postReview } from "./actions";

const inputClass =
  "min-h-[42px] w-full px-2.5 text-[13px] outline-none focus:border-poly-green-dark focus:ring-2 focus:ring-poly-green-dark/15";
// const review =
//   "I shared Cedar House with two other students during the 2025–26 school year. The living room and backyard gave us plenty of shared space. Emma was easy to reach, and our dryer repair was handled within a few days.\nWater and trash were included, but our gas bill was higher in winter. I’d recommend agreeing on the room sizes and rent split before you sign.";

// function submitReview(
//   formData: FormData
// ){

// }



function Section({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[10px] border border-border-inputs bg-white p-5">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function StarRating({
  label,
  name,
  initialValue,
  changeRating,
  required = false
}: {
  label: string;
  name: string;
  initialValue: number;
  changeRating: React.Dispatch<React.SetStateAction<number>>
  required?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2 first:mb-2 first:border-b first:border-border-inputs first:pb-4">
      <span className="text-[13px]">
        {label}
        {required ? " *" : ""}
      </span>
      <div
        className="flex text-poly-green-dark"
        role="img"
        aria-label={`${initialValue} out of 5 stars for ${label.toLowerCase()}`}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="flex size-[31px] items-center justify-center hover:bg-red"
            onClick={() => value === initialValue ? changeRating(-1) : changeRating(value)}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-[21px]"
              fill={
                value <= initialValue ? "currentColor" : "none"
              }
              stroke={
                value <= initialValue
                  ? "currentColor"
                  : "#7b867e"
              }
              strokeWidth="1.5"
              >
              <path d="m12 3 2.6 6.4 6.9.5-5.3 4.5 1.7 6.6-5.9-3.7L6.1 21l1.7-6.6-5.3-4.5 6.9-.5Z" />
            </svg>
          </span>
        ))}
        <input name={name} value={initialValue} readOnly={true} hidden></input>
      </div>
    </div>
  );
}

export default function ReviewForm() {
  const [state, formAction, isPending] = useActionState(postReview, {})

  const [overallRating, setOverallRating] = React.useState(-1);
  const [condRating, setCondRating] = React.useState(-1);
  const [landlordRating, setLandlordRating] = React.useState(-1);
  const [maintRating, setMaintRating] = React.useState(-1)

  const [review, setReview] = React.useState("");

  return (
    <form
    className="flex min-w-0 flex-col gap-5 text-[13px] [&_label]:text-xs [&_label]:font-medium [&_input]:font-normal [&_textarea]:font-normal [&_input[type=checkbox]]:size-4 [&_input[type=checkbox]]:shrink-0 [&_input[type=checkbox]]:accent-poly-green-dark"
    action={formAction}
    >
      <Section title="When did you live here?">
        <div className="grid gap-4 sm:grid-cols-2">
          <Textbox
            id="move-in"
            name="moveIn"
            type="month"
            defaultValue="2025-09"
            required
            className={inputClass}>
            Move-in month &amp; year *
          </Textbox>
          <Textbox
            id="move-out"
            name="moveOut"
            type="month"
            defaultValue="2026-08"
            min="2025-09"
            required
            className={inputClass}>
            Move-out month &amp; year *
          </Textbox>
        </div>
        <label className="my-4 flex items-center gap-2">
          <input type="checkbox" name="currentResident" />I
          currently live here
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label
            className="flex flex-col gap-3"
            htmlFor="arrangement">
            Your living arrangement
            <select
              id="arrangement"
              name="arrangement"
              defaultValue="shared"
              className={`${inputClass} appearance-none rounded-md border border-border-inputs bg-white font-normal`}>
              <option value="shared">
                Shared home with roommates
              </option>
              <option value="alone">Lived on my own</option>
              <option value="family">
                Shared home with family
              </option>
            </select>
          </label>
          <Textbox
            id="monthly-rent"
            name="monthlyRent"
            // defaultValue="$1,200 · my share"
            className={inputClass}>
            Monthly rent you paid
          </Textbox>
        </div>
      </Section>

      <Section title="Rate your experience">
        <div className="-mb-2 -mt-2">
          <StarRating
            label="Overall experience"
            initialValue={overallRating}
            changeRating={setOverallRating}
            name="overallRating"
            required
          />
          <StarRating
            label="Property condition"
            initialValue={condRating}
            changeRating={setCondRating}
            name="condRating"
          />
          <StarRating
            label="Landlord communication"
            initialValue={landlordRating}
            changeRating={setLandlordRating}
            name="landlordRating"
          />
          <StarRating
            label="Maintenance response"
            initialValue={maintRating}
            changeRating={setMaintRating}
            name="maintRating"
          />
        </div>
      </Section>

      <Section title="Write Review">
        <div className="flex flex-col gap-5">
          <Textbox
            id="review-title"
            name="title"
            // defaultValue="A good home for a roommate group"
            required
            maxLength={150}
            className={inputClass}>
            Review title *
          </Textbox>
          <Textarea
            id="review"
            name="review"
            required
            maxLength={100}
            // defaultValue={review}
            onChange={(e) => setReview(e.target.value)}
            aria-describedby="review-help"
            className={`${inputClass} min-h-[96px] resize-y leading-[19px]`}>
            Your review *
          </Textarea>
          <p
            id="review-help"
            className="-mt-1 text-[11px] leading-4 text-under-input">
            {review.length.toLocaleString()} / 2,000 characters
            · Be specific about your experience living here.
          </p>
          <Textarea
            id="budget"
            name="budget"
            // defaultValue="My share of electricity, gas and internet was usually $50–$80 per month. Winter gas was the biggest variable."
            className={`${inputClass} min-h-[96px] resize-y leading-[19px]`}>
            Anything students should budget for?
          </Textarea>
          <Textbox
            id="advice"
            name="advice"
            // defaultValue="Bring a bike and discuss the rent split with roommates before signing."
            className={inputClass}>
            Advice for the next residents (optional)
          </Textbox>
        </div>
      </Section>

      <Section title="How your review will appear">
        <div className="grid gap-4 sm:grid-cols-2">
          <Textbox
            id="display-name"
            name="displayName"
            // defaultValue="Jamie L."
            className={inputClass}>
            Display name
          </Textbox>
          <label
            htmlFor="relationship"
            className="flex flex-col gap-3">
            Relationship to property
            <select
              id="relationship"
              name="relationship"
              defaultValue="former"
              className={`${inputClass} appearance-none rounded-md border border-border-inputs bg-white font-normal`}>
              <option value="former">Former resident</option>
              <option value="current">Current resident</option>
            </select>
          </label>
        </div>
        <p className="my-4 text-[11px] leading-[18px] text-under-input">
          Your email and exact move-in / move-out dates won’t be
          shown. Your review will show the years you lived here.
        </p>
        <div className="flex flex-col gap-4">
          <label className="flex items-start gap-2 leading-[18px]">
            <input
              type="checkbox"
              name="livedHere"
              required
              // defaultChecked
              className="mt-px"
            />
            I personally lived at this property and this
            reflects my own experience. *
          </label>
          <label className="flex items-start gap-2 leading-[18px]">
            <input
              type="checkbox"
              name="guidelinesAccepted"
              required
              // defaultChecked
              className="mt-px"
            />
            My review follows the Community Guidelines. *
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border-inputs pt-4">
          <p className="text-[11px] text-under-input">
            * Required fields
          </p>
          <div className="flex items-center gap-2.5">
            <Link
              href="/listing"
              className="rounded-md border border-border-inputs px-4 py-2.5 hover:bg-poly-green-light">
              Cancel
            </Link>
            <Button
              type="submit"
              className="flex min-h-10 items-center gap-2 px-4 py-2.5 font-medium hover:bg-green-button-click focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poly-green-dark" >
              <Icon name="arrow" />
              Submit review
            </Button>
          </div>
        </div>
      </Section>
    </form>
  );
}
