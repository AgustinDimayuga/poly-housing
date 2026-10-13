import { NextResponse } from "next/server";

let listings = [
  {
    id: 123,
    address: "house st"
  },
  {
    id: 321,
    address: "canal st"
  }
];

const getListingById = (id: number) =>
  listings.find((listing) => listing.id === id);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const listingId: number = Number.parseInt((await params).id);

  const listing = getListingById(listingId);

  if (listing === undefined) {
    return NextResponse.json(
      { error: "cannot find listing" },
      { status: 404 }
    );
  }

  return NextResponse.json(listing, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const listingId: number = Number.parseInt((await params).id);
  const listing = getListingById(listingId);
  if (listing === undefined) {
    return NextResponse.json(
      { error: "cannot find listing" },
      { status: 404 }
    );
  }

  listings = listings.filter(
    (listing) => listing.id !== listingId
  );

  return NextResponse.json({ text: "deleted" });
}
