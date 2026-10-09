import React from "react";

import Textbox from "../components/text";
import Button from "../components/button";
import Image from "next/image";


export default async function LoginPage(){
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


            <h1 className="text-4xl font-inter font-bold">Login to PolyHousing</h1>
            <p className="mt-5">new here? <a className="text-under-input hover:underline">create an account -&gt;</a></p>

            <div className="">
                {/* <h2>email address</h2> */}
                <Textbox>email address</Textbox>
            </div>
            <div className="">
                {/* <h2>password</h2> */}
                <Textbox type="password">password</Textbox>
            </div>
            <div className="flex flex-row items-center gap-2">
                <label>
                    <input type="checkbox" className="h-4 w-4 accent-green-800"/>
                    <span className="text-sm   "> stay logged in?</span>
                </label>
            </div>
            <div>
                <Button variant="primary" aria-label="Log in" className="w-full">log in</Button>
            </div>
         </div>
        </div>

    )

}
