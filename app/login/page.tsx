'use client'

import Textbox from "../components/text";
import Button from "../components/button";
import Link from "next/link";
import React, { SubmitEvent } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {

  const [ifcorrectPass, setPassState] = React.useState(true)

  async function loginUser(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")
    const password = formData.get("password")

    //send password and check if they are matching on the server

    const userCreds = {
      email: email,
      password: password
    }

    const response = await fetch('http://127.0.0.1:8000/users/auth', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCreds)
    })

    if(response.status === 200){
      redirect("/Listings");
    }
    else if (response.status === 401){
      setPassState(false);
      return
    }
  }


  return (
    <div className="flex justify-center-safe bg-poly-green-light min-h-screen min-w-screen">

       <form className="flex flex-col mt-20 gap-5 w-120" onSubmit={loginUser}>

        <h1 className="text-4xl font-inter font-bold">
          Login to PolyHousing
        </h1>

        <p className="mt-5">
          new here?{" "}
          <Link href="./" className="text-under-input hover:underline">
            create an account -&gt;
          </Link>
        </p>

        <div className="">
          {/* <h2>email address</h2> */}
          <Textbox name="email" required>email address</Textbox>
        </div>

        <div className="">
          {/* <h2>password</h2> */}
          <Textbox name="password" type="password" required>password</Textbox>
          {!ifcorrectPass && <p className="text-red-500 text-sm">Incorrect Password</p>}
        </div>

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
            className="w-full"
            type="submit">
            log in
          </Button>
        </div>

        </form>

      {/* </div> */}

    </div>
  );
}
