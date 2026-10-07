import Image from "next/image"
import Button from "./button"

export default function Header() {
  return (
    <div className=" grid grid-cols-2 bg-white text-black p-5 shadow-md mt-1" >

        <div className="flex flex-row ">

            <Image  src= "/house.png" alt=" PolyHousing Logo"  width={40} height={0} className=" mr-5 "  />
            <h1 className=" font-bold text-3xl"> Poly Housing </h1>

            <ul className="flex flex-row ml-auto gap-5 text-under-input mt-1 ">
                <li className="hover:underline"> Find Housing </li>
                <li className="hover:underline"> Subleases </li>
                <li className="hover:underline "> Saved Houses </li>
            </ul>

        </div>

        <div className="flex flex-row justify-end gap-50 ">

            <Button variant="white" className=" p-2"> + Post Listing</Button>
            <p className=" font-inter font-bold hover:underline"> Log in </p>

        </div>

    </div>
  )

}
