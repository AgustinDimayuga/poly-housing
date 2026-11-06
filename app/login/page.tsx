"use client";

import Textbox from "../components/text";
import Button from "../components/button";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    login,
    {}
  );

  return (
    <div className="flex justify-center-safe bg-poly-green-light min-h-screen min-w-screen">
      <form
        className="flex flex-col mt-20 gap-5 w-120"
        action={formAction}>
        <h1 className="text-4xl font-inter font-bold">
          Login to PolyHousing
        </h1>

        <p className="mt-5">
          new here?{" "}
          <Link
            href="./"
            className="text-under-input hover:underline">
            create an account -&gt;
          </Link>
        </p>

        <div className="">
          <Textbox
            name="email"
            defaultValue={state.email}
            required>
            email address
          </Textbox>
        </div>

        <div className="">
          <Textbox name="password" type="password" required>
            password
          </Textbox>
        </div>
        <span className="text-red-600">{state.error}</span>

        <div className="flex flex-row items-center gap-2">
          <label>
            <input
              type="checkbox"
              className="h-4 w-4 accent-green-800"
              name="stay"
            />
            <span className="text-sm"> stay logged in?</span>
          </label>
        </div>

        <div>
          <Button
            variant="primary"
            aria-label="Log in"
            className="w-full disabled:bg-gray-900"
            disabled={isPending}
            type="submit">
            log in
          </Button>
        </div>
      </form>
    </div>
  );
}
