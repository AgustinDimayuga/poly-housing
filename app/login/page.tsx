'use client'

import Textbox from "../components/text";
import Button from "../components/button";
import Link from "next/link";
import { SubmitEvent } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {

  async function loginUser(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    // const response = await fetch('',{
    //   method: 'POST',
    //   body: formData
    // })

    // const data = await response.json()


    //do something to match passwords

    //testing

    const email = formData.get("email")
    const password = formData.get("password")

    console.log(email)
    console.log(password)
  }


  return (
    // <div className="grid grid-cols-2">
    //     <div>
    //         left
    //     </div>
    //     <div>

    //         right
    //     </div>
    // </div>

    // <div className="flex items-center flex-col p-5">

    // <div className="grid grid-cols-2 bg-poly-green-light min-h-screen">
    <div className="flex justify-center-safe bg-poly-green-light min-h-screen min-w-screen">
      {/* <div>
                picture here
                <Image src="/redcircle.png" width={600} height={100} alt="circle"></Image>
            </div> */}

      {/* <div className="flex flex-col mr-20 mt-20 gap-5"> */}
      <div className="flex flex-col mt-20 gap-5 w-120">
        <h1 className="text-4xl font-inter font-bold">
          Login to PolyHousing
        </h1>
        <p className="mt-5">
          new here?{" "}
          <Link href="./" className="text-under-input hover:underline">
            create an account -&gt;
          </Link>
        </p>





        <form onSubmit={loginUser}>

        <div className="">
          {/* <h2>email address</h2> */}
          <Textbox name="email">email address</Textbox>
        </div>
        <div className="">
          {/* <h2>password</h2> */}
          <Textbox name="password" type="password">password</Textbox>
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





      </div>

    </div>
  );
}
