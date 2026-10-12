import Title from "./components/titles";
import Bubble_text from "./components/bubble";
import Button from "../components/button";
import Image from "next/image";
export default function listing(){

    return(


        <div className="bg-poly-green-light min-h-screen">
            <div className="grid grid-cols-2 mt-[5%] ml-[5%]">
                <div>
                    <Title address="426 Lafond Road, Tipton CA 93274">Faze_FBI_1337 House </Title>
                    <div className="flex flex-row gap-3 mt-5">
                        <Bubble_text variant="Message">Dangeroud Neighborhood  </Bubble_text>
                        <Bubble_text variant="Message">Carne Asada Grill </Bubble_text>
                        <Bubble_text variant="Review" rating={5} reviews={100} > W Backyard  </Bubble_text>

                    </div>

                </div>


                <div className="flex items-center justify-end gap-3 mr-20">
                    <Button variant="white" className="w-28 h-12 "> Share</Button>
                    <Button variant="white" className="w-28 h-12 "> Save</Button>
                </div>
            </div>

            <div className="grid grid-cols-2 ml-[5%]">
                <Image src="/polyhouse-signup.jpg" width={600} height={100} alt="Picture of House" className="rounded-2xl  mt-10"/>
                <div>
                    <Image src="/polyhouse-signup.jpg" width={280} height={100} alt="Picture of House" className="rounded-2xl mt-10"/>
                    <Image src="/polyhouse-signup.jpg" width={280} height={100} alt="Picture of House" className="rounded-2xl  mt-10"/>

                </div>


            </div>


        </div>
    )


}
