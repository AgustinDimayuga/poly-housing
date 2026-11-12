"use server";

import { redirect } from "next/navigation";

type PostState = { error?: string; success: boolean };

export async function postReview(
  prevState: PostState,
  formData: FormData
): Promise<PostState> {
  const moveIn = formData.get("moveIn");
  const moveOut = formData.get("moveOut");
  const currentResident =
    formData.get("currentResident") === "on";
  const arrangement = formData.get("arrangement");
  const rent = formData.get("monthlyRent");

  //add stuff for the ratings here

  const overallRating = formData.get("overallRating");
  const condRating = formData.get("condRating");
  const landlordRating = formData.get("landlordRating");
  const maintRating = formData.get("maintRating");

  const title = formData.get("title");
  const review = formData.get("review");
  const budget = formData.get("budget");
  const advice = formData.get("advice");
  const displayName = formData.get("displayName");
  const relationship = formData.get("relationship");

  const reviewPosting = {
    moveIn: moveIn,
    moveOut: moveOut,
    // currentResident: currentResident,
    arrangement: arrangement,
    rent: rent,
    overallRating: overallRating,
    condRating: condRating,
    landlordRating: landlordRating,
    maintRating: maintRating,
    title: title,
    review: review,
    budget: budget,
    advice: advice,
    displayName: displayName,
    relationship: relationship
  };

  // const response = await fetch(`${process.env.API_URL}`, {
  const response = await fetch(
    `http://127.0.0.1:8000/reviews/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewPosting)
    }
  );

  console.log(await response.json());

  console.log(response.status);

  if (!response.ok) {
    return {
      error: "could not post review",
      success: false
    };
  } else {
    redirect("/listings");
  }
  // return {
  //   error: "",
  //   success: true
  // };
}
