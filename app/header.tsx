import Image from "next/image"

export default function Header() {
  return (
    <div className=" grid grid-cols-2 bg-white text-black p-5" >

        <div className="flex flex-row ">

            <Image  src= "/house.png" alt=" PolyHousing Logo"  width={30} height={0} className=" mr-5 "  />
            <h1 className=""> Poly Housing </h1>

            <ul className="flex flex-row ml-auto gap-5">
                <li> Find Housing </li>
                <li> Subleases </li>
                <li> Saved Houses </li>
            </ul>

        </div>

        <div className="flex flex-row justify-end gap-50 ">
            <p> Post Listing </p>
            <p  > Login </p>

        </div>

    </div>
  )

}
