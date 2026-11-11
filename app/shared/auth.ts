// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
  const token = (await cookies()).get("session")?.value;

  console.log("token", token);
  if (!token) return null;

  const res = await fetch(`${process.env.API_URL}/user/me`, {
    // match your route path
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  console.log(res.ok);
  return res.ok ? res.json() : null;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
