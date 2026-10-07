import Image from "next/image"

export default function Header() {
  return (
    <div className=" grid grid-cols-2 bg-white text-black p-5 shadow-md" >

        <div className="flex flex-row ">

            <Image  src= "/house.png" alt=" PolyHousing Logo"  width={40} height={0} className=" mr-5 "  />
            <h1 className=""> Poly Housing </h1>

            <ul className="flex flex-row ml-auto gap-5 ">
                <li className="hover:underline"> Find Housing </li>
                <li className="hover:underline"> Subleases </li>
                <li className="hover:underline "> Saved Houses </li>
            </ul>

        </div>

        <div className="flex flex-row justify-end gap-50 ">
            <div className=" flex flex-row gap-2 p-2 pl-3 bg-gray-300 rounded-md">
                <p> + </p>
                <p> Post Listing </p>
            </div>
            <p> Login </p>



        </div>

    </div>
  )

}
