'use client'

import Image from "next/image";
import Button from "./components/button";
import Textbox from "./components/text";
import Bubble_text from "./components/bubble";
import Link from "next/link";
import { SubmitEvent } from "react";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {

  const [userType, setUserType] = React.useState("Student");
  const [ifStudent, setifStudent] = React.useState(true)
  const [ifMatching, setifMatching] = React.useState(true)
  const [ifSuccess, setSuccess] = React.useState(true);

  async function createUser(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("fname")
    const lastName = formData.get("lname")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPass = formData.get("confirmpass")
    const wantUpdates = formData.get("wantupdates")

    const fullName = `${firstName} ${lastName}`

    if(password !== confirmPass){
      setifMatching(false);
      return
    } else {
      setifMatching(true);
    }

    const newUser = {
        name: fullName,
        email: email,
        password: password,
        role: userType
      }

    const response = await fetch('http://127.0.0.1:8000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })

    if(response.status === 201){
      console.log("created new user")
      redirect("/Listings")
    } else {
      setSuccess(false)
    }

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
            variant={ifStudent ? "primary" : "white"}
            aria-label="Student"
            className="h-10 w-full"
            onClick={() => {
              setUserType("Student");
              setifStudent(true);
              }}>
            Student
          </Button>

          <Button
            variant={!ifStudent ? "primary" : "white"}
            aria-label="Owner/Realtor"
            className="h-10 w-full"
            onClick={() => {
              setUserType("Realtor");
              setifStudent(false)}}>
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
        {!ifSuccess && <p className="text-red-500 text-sm">Error in creating account</p>}

      </form>
    </div>
  );
}
