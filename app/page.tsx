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

  // let userType: string = "student";

  const [userType, setUserType] = React.useState("student");

  const [ifStudent, setifStudent] = React.useState(true)

  // function changeType(){

  //   setUserType("realtor");

  // }

  async function onSubmit(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.append("usertype", userType);

    const firstName = formData.get("fname")
    const lastName = formData.get("lname")
    const typeOfUser = formData.get("usertype")


    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPass = formData.get("confirmpass")
    const wantUpdates = formData.get("wantupdates")

    console.log(`fname: ${firstName} lname: ${lastName} typeofUser: ${typeOfUser}
      email: ${email} password: ${password} confirmPass: ${confirmPass} wantUpdates: ${wantUpdates}`)


    // console.log(formData);

    // console.log(formData.get("email"));
    // const response = await fetch('', {
    //   method: "POST",
    //   body: "hi" //data here
    // })

      //handle response
    // const data = await response.json();


    //redirect("/Listings");

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
      <form className="flex min-w-0 flex-col gap-5 px-6 py-10 lg:pl-0 lg:pr-20 lg:pt-20" onSubmit={onSubmit}>

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
              setUserType("student");
              setifStudent(true);
              }}>
            Student
          </Button>
          <Button
            variant={!ifStudent ? "primary" : "white"}
            aria-label="Owner/Realtor"
            className="h-10 w-full"
            onClick={() => {
              setUserType("realtor");
              setifStudent(false)}}>
            Owner/Realtor
          </Button>

        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <Textbox placeholder="Enter your first name" name="fname">
            First Name
          </Textbox>
          <Textbox placeholder="Enter your last name" name="lname">
            Last Name
          </Textbox>
        </div>

        <Textbox
          placeholder="Please enter your email"
          type="email"
          name="email">
          Email
        </Textbox>

        <Textbox
          placeholder="Please enter your password"
          type="password"
          name="password">
          Password
        </Textbox>

        <div className="flex flex-col gap-3">
          <Textbox
            placeholder="Confirm password"
            type="password"
            name="confirmpass">
            Confirm Password
          </Textbox>
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

      {/* </div> */}

      </form>
    </div>
  );
}

{
  /* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div> */
}
