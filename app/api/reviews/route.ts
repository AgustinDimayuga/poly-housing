import { NextResponse } from "next/server";

interface Review {
  // id: UUID,
  id: number;
  listingId: number;
  rating: number;
  comment: string;
  // createdAt: Date,
  createdAt: string;
}

const reviews: Review[] = [
  {
    id: 1234,
    listingId: 1234,
    rating: 4,
    comment: "comment",
    createdAt: new Date().toUTCString()
  },
  {
    id: 321,
    listingId: 5432,
    rating: 5,
    comment: "comment2",
    createdAt: new Date().toUTCString()
  }
];

export function GET(request: Request) {
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const reviewToAdd = await request.json();
  reviews.push(reviewToAdd);
  return NextResponse.json(reviewToAdd, { status: 201 });
}
