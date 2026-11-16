"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(payload: Record<string, unknown>) {
  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/auth/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
  } catch {
    return { error: "Couldn't reach the server. Try again." };
  }

  if (res.status === 409)
    return {
      error: "An account with that email already exists."
    };
  if (!res.ok)
    return {
      error: "Please check your details and try again."
    };

  const { access_token } = await res.json();

  (await cookies()).set("session", access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 45 * 60
  });

  redirect("/listings");
}
