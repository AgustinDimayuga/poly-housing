import Textbox from "@/app/components/text"
import Button from "@/app/components/button"


export default function Listing_Summary(){
    return (

        <div className=" flex flex-col p-5 bg-white rounded-4xl border border-border-inputs shadow-2xl justify-center max-w-[75%] mx-auto gap-3">

            <h1 className=" text-3xl font-bold text-signup-title-green"> 3100 / Month </h1>
            <p className=" text-under-input">Entire Home  ~  available Sep 2027 </p>
            <hr className="my-4 border-under-input" />
            <p> Emma Kim </p>
            <p>Property Owner ~  Cedar rentals </p>
            <p> Dummy email @ gmail.com </p>
            <p> Phone Number </p>
            <Textbox  className ="h-30 "placeholder="Your Message to the Realtor :)" > Your Message </Textbox>
            <div className="flex flex-col gap-3">
                <Button className= "h-10 " variant="primary"> Send Inquiry </Button>
                <Button className="h-10" variant="white"> Start Application</Button>
            </div>

            <p className="text-under-input"> No Payment is required to send an Inquiry.Confirm lease terms with the owner  before applying</p>


        </div>


    )


}
