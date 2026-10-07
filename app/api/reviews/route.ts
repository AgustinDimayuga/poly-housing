import { NextResponse } from "next/server";

export function GET(request: Request) {
  const review = {
    test: "review"
  };

  return NextResponse.json(review);
}
