"use server";

import { redirect } from "next/navigation";

type PostState = { error?: string };

export async function postReview(
  formData: FormData
): Promise<"something"> {
  const moveIn = formData.get("moveIn");
  const moveOut = formData.get("moveOut");
  const currentResident =
    formData.get("currentResident") === "on";
  const arrangement = formData.get("arrangement");
  const rent = formData.get("monthlyRent");

  //add stuff for the ratings here

  const title = formData.get("title");
  const review = formData.get("review");
  const budget = formData.get("budget");
  const advice = formData.get("advice");
  const displayName = formData.get("displayName");
  const relationship = formData.get("relationship");

  const reviewPosting = {
    moveIn: moveIn
  };

  const response = await fetch(`${process.env.API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewPosting)
  });

  if (!response.ok) {
  }
}
