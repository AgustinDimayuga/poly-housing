import React from "react";

import Link from "next/link";

import Textbox from "../components/text";
import Button from "../components/button";
import Image from "next/image";


export default async function LoginPage(){
    return (
        // <div className="grid grid-cols-2 bg-poly-green-light min-h-screen">
        <div className="flex justify-center bg-poly-green-light min-h-screen min-w-screen">

            {/* <div>
                picture here
                <Image src="/redcircle.png" width={600} height={100} alt="circle"></Image>
            </div> */}

            {/* <div className="flex flex-col mr-20 mt-20 gap-5"> */}
            <div className="flex flex-col mt-20 gap-5 w-120">

                <h1 className="text-4xl font-inter font-bold">Login to PolyHousing</h1>
                <p className="mt-5">new here? <Link href="../" className="text-under-input hover:underline">create an account -&gt;</Link></p>

                <div className="">
                    <Textbox>email address</Textbox>
                </div>
                <div className="">
                    {/* <h2>password</h2> */}
                    <Textbox type="password">password</Textbox>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <label>
                        <input type="checkbox" className="h-4 w-4 accent-green-800"/>
                        <span className="text-sm"> stay logged in?</span>
                    </label>
                </div>
                <div>
                    <Button variant="primary" aria-label="Log in" className="w-full">log in</Button>
                </div>

                <div className="flex flex-col border border-border-inputs rounded-sm p-5 gap-2">
                    <h2 className="">Still exploring?</h2>
                    <p className="text-xs">You don&apos;t need an account to see available housing or subleases.</p>
                    <Button variant="white" aria-label="Continue exploring" className="w-full">Continue Exploring</Button>
                </div>
         </div>
        </div>

    )

}
