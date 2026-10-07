import { UUID } from "crypto";
import { NextResponse } from "next/server";

interface User {
  //id: UUID;
  id: number;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  //createdAt: Date;
  createdAt: string;
}

interface Student extends User {
  major: string;
  year: number;
}

interface Realtor extends User {
  //realtorId: UUID;
  realtorId: number;
  company: string;
  verifed: boolean;
  contactEmail: string;
  contactPhone: string;
}

const users: User[] = [
  {
    id: 1234,
    name: "newuser",
    email: "email",
    phone: "phone",
    passwordHash: "hash",
    createdAt: new Date().toUTCString()
  },
  {
    id: 4321,
    name: "test2",
    email: "email2",
    phone: "phone2",
    passwordHash: "hash2",
    createdAt: new Date().toUTCString()
  }
];

export function GET(request: Request) {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser = await request.json();

  if (newUser === null) {
    return NextResponse.error();
  }

  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
