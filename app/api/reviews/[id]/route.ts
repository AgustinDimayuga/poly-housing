import { NextResponse } from "next/server";

let reviews = [
  {
    id: 123,
    desc: "test"
  }
];

const getReviewById = (id: number) =>
  reviews.find((review) => review.id === id);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const reviewId = Number.parseInt((await params).id);
  const review = getReviewById(reviewId);
  return NextResponse.json(review, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const reviewId = Number.parseInt((await params).id);
  const review = getReviewById(reviewId);

  if (review === undefined) {
    return NextResponse.json(
      { error: "cannot find user" },
      { status: 404 }
    );
  }

  reviews = reviews.filter((review) => review.id !== reviewId);
  return NextResponse.json({ text: "deleted" });
}
