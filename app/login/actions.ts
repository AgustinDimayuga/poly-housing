"use server";

// app/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = { error?: string; email?: string };

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {
      error: "Please enter your email and password.",
      email: username
    };
  }
  console.log(process.env.API_URL);

  const res = await fetch(
    `${process.env.API_URL}/auth/tokens`,
    {
      method: "POST",
      body: new URLSearchParams({ username, password })
    }
  );

  if (!res.ok) {
    return {
      error: "Incorrect email or password.",
      email: username
    };
  }

  const { access_token } = await res.json();

  (await cookies()).set("session", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30 // ✅ 30 days
  });

  redirect("/"); // must be outside any try/catch
}
export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}
