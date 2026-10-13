import { NextResponse } from "next/server";

//for testing
let users = [
  {
    id: 123,
    name: "test"
  },
  {
    id: 321,
    name: "test2"
  },
  {
    id: 111222,
    name: "test3"
  }
];

const getUserById = (id: number) =>
  users.find((user) => user.id === id);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId: number = Number.parseInt((await params).id);
  const user = getUserById(userId);

  if (user === undefined) {
    return NextResponse.json(
      { error: "cannot find user" },
      { status: 404 }
    );
  }
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId: number = Number.parseInt((await params).id);
  const user = getUserById(userId);
  if (user === undefined) {
    return NextResponse.json(
      { error: "cannot find user" },
      { status: 404 }
    );
  }

  users = users.filter((user) => user.id !== userId);

  return NextResponse.json({ text: "deleted" });
}
