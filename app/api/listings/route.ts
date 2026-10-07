import { UUID } from "crypto";
import { NextResponse } from "next/server";

interface Listing {
  //id: UUID;
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  //   availabilityDate: Date;
  availabilityDate: string;
  housingType: string;
  leaseType: string;
  bedrooms: number;
  bathrooms: number;
  petsAllowed: boolean;
  //   createdAt: Date;
  createdAt: string;
  //   updatedAt: Date;
  updatedAt: string | null;
}

interface House extends Listing {
  address: string;
  propertyType: string;
}

interface Apartment extends Listing {
  address: string;
  floor: number;
  unitNumber: string;
}

const listings: Listing[] = [
  {
    id: 1234,
    title: "title",
    description: "desc",
    price: 5000,
    location: "slo",
    availabilityDate: new Date().toUTCString(),
    housingType: "house",
    leaseType: "year",
    bedrooms: 3,
    bathrooms: 2,
    petsAllowed: true,
    createdAt: new Date().toUTCString(),
    updatedAt: null
  },
  {
    id: 1337,
    title: "title2",
    description: "desc2",
    price: 1000,
    location: "slo",
    availabilityDate: new Date().toUTCString(),
    housingType: "apartment",
    leaseType: "year",
    bedrooms: 5,
    bathrooms: 3,
    petsAllowed: false,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString()
  }
];

export function GET(request: Request) {
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const newListing = await request.json();

  listings.push(newListing);
  return NextResponse.json(newListing, { status: 201 });
}
