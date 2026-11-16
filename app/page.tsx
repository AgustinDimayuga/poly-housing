'use client'

import Image from "next/image";
import Button from "./components/button";
import Textbox from "./components/text";
import Bubble_text from "./components/bubble";
import Link from "next/link";
import React from "react";
import type { FormEvent } from "react";
import { signup } from "./signup/signup";

export default function Home() {

  // const [userType, setUserType] = React.useState("Student");
  // const [ifStudent, setifStudent] = React.useState(true)
  // const [ifMatching, setifMatching] = React.useState(true)
  // const [ifSuccess, setSuccess] = React.useState(true);

  const [role, setRole] = React.useState<"STUDENT" | "REALTOR">("STUDENT");
  const [ifMatching, setifMatching] = React.useState(true);
  const [error, setError] = React.useState("");

  async function createUser(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);

  const password = String(form.get("password"));
  if (password !== String(form.get("confirmpass"))) {
    setifMatching(false);
    return;
  }
  setifMatching(true);

  if (password.length < 8 || !/[0-9\W_]/.test(password)) {
    setError("Password needs 8+ characters and a number or symbol.");
    return;
  }
  setError("");


  const base = {
    name: `${form.get("fname")} ${form.get("lname")}`.trim(),
    email: String(form.get("email")).trim().toLowerCase(),
    password,
    role,

  };

//   {
//   "name": "string",
//   "email": "string",
//   "password": "string",
//   "role": "STUDENT",
//   "grad_year": 0,
//   "campus_id": 0
// }


  const payload =
    role === "STUDENT"
      ? { ...base,   grad_year : 2030 , campus_id: 1 }
      : {
          ...base,  license_num : "12345", license_state: "CA"

        };

  const result = await signup(payload);
  if (result?.error) setError(result.error);
}

  return (
    <div className="grid min-h-screen grid-cols-1 bg-poly-green-light lg:grid-cols-2">
      {/* Left side: marketing */}
      <div className="flex min-w-0 flex-col gap-10 px-6 pt-8 lg:pl-15 lg:pr-0 lg:pt-10">

        <div className="flex flex-col items-start gap-6 lg:gap-10">
          <Bubble_text variant="Message">
            Built Around Student Life
          </Bubble_text>

          <h1 className="font-inter text-3xl font-semibold text-signup-title-green lg:text-4xl">
            Your off-campus search, all in one place.
          </h1>

          <p className="max-w-md text-under-input">
            Student-friendly homes, quarter-length subleases and
            the details you need before signing
          </p>

          <div className="relative aspect-[3/2] w-full max-w-[600px]">
            <Image
              src="/polyhouse-signup.jpg"
              alt="Picture of House"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">

          <h2 className="font-bold text-signup-title-green">
            Keep your shortlist together
          </h2>
          <h2 className="mb-2 text-under-input">
            Save homes and notes for your roommate group
          </h2>
          <h2 className="font-bold text-signup-title-green">
            Connect with the right person
          </h2>
          <h2 className="mb-2 text-under-input">
            Reach owners, realtors and students directly
          </h2>
          <h2 className="font-bold text-signup-title-green">
            Plan for your move-in
          </h2>
          <h2 className="text-under-input">
            Search by dates, not just immediate vacancies
          </h2>
        </div>

      </div>

      {/* Right side: signup form */}
      <form className="flex min-w-0 flex-col gap-5 px-6 py-10 lg:pl-0 lg:pr-20 lg:pt-20" onSubmit={createUser}>

      {/* <div className="flex min-w-0 flex-col gap-5 px-6 py-10 lg:pl-0 lg:pr-20 lg:pt-20"> */}
        <div>
          <h1 className="font-inter text-3xl font-bold lg:text-4xl">
            Create your account
          </h1>
          <Link href="./login" className="mt-3 text-under-input hover:underline lg:mt-5">
            Already have an account?
          </Link>
        </div>

        <p className="font-inter">Im here as a...</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">

          <Button
            type="button"
            variant={role === "STUDENT" ? "primary" : "white"}
            aria-label="Student"
            className="h-10 w-full"
            onClick={() => setRole("STUDENT")}>
            Student
          </Button>

          <Button
            type="button"
            variant={role === "REALTOR" ? "primary" : "white"}
            aria-label="Owner/Realtor"
            className="h-10 w-full"
            onClick={() => setRole("REALTOR")}>
            Owner/Realtor
          </Button>

        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <Textbox placeholder="Enter your first name" name="fname" required>
            First Name
          </Textbox>

          <Textbox placeholder="Enter your last name" name="lname" required>
            Last Name
          </Textbox>
        </div>

        <Textbox
          placeholder="Please enter your email"
          type="email"
          name="email"
          required>
          Email
        </Textbox>

        <Textbox
          placeholder="Please enter your password"
          type="password"
          name="password"
          required>
          Password
        </Textbox>

        <div className="flex flex-col gap-3">
          <Textbox
            placeholder="Confirm password"
            className={!ifMatching ? "border-red-500" : ""}
            type="password"
            name="confirmpass"
            required>
            Confirm Password
          </Textbox>
          {!ifMatching && <p className="text-red-500 text-sm">Passwords must match</p>}
          <p className="text-sm text-under-input">
            At least 8 characters with a number or symbol
          </p>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-green-800"
            name="wantupdates"
          />
          <span className="text-sm">
            {/* {role === "REALTOR" && (
              <>
                <Textbox placeholder="License number" name="license_num" required>
                  License number
                </Textbox>
                <Textbox placeholder="e.g. CA" name="license_state" maxLength={2} required>
                  License state
                </Textbox>
                <Textbox placeholder="Optional" name="office_location">
                  Office location
                </Textbox>
              </>
            )} */}
            Send me housing updates by email (optional)
          </span>
        </label>

        <Button
          variant="primary"
          aria-label="Create Account"
          className="mt-4 h-10 w-full lg:mt-10"
          type="submit">
          Create Account
        </Button>
        {error && <p role="alert" className="text-red-500 text-sm"> {error}  </p>}

      </form>
    </div>
  );
}
