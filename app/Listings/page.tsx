import Title from "./components/titles"
import Bubble_text from "./components/bubble"
import Button from "../components/button"
import Image from "next/image"
import Listing_Summary from "./components/summary"

export default function ListingPage() {
    return (
        <div className="bg-poly-green-light min-h-screen">
            <div className="mx-auto max-w-7xl py-10">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <Title address="1248 Cedar St, San Luis Obispo, CA 93405 · Anholm">
                            Cedar House
                        </Title>
                        <div className="flex flex-row gap-3 mt-5">
                            <Bubble_text variant="Message">Students welcome</Bubble_text>
                            <Bubble_text variant="Message">Available Sep 1, 2027</Bubble_text>
                            <Bubble_text variant="Review" rating={4.6} reviews={8}>Hello</Bubble_text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="white" className="w-28 h-12">Share</Button>
                        <Button variant="white" className="w-28 h-12">Save</Button>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mt-8 grid h-[350px] grid-cols-3 grid-rows-2 gap-3">
                    <div className="relative col-span-2 row-span-2">
                        <Image src="/polyhouse-signup.jpg" alt="Front of house" fill className="rounded-2xl object-cover" />
                    </div>
                    <div className="relative">
                        <Image src="/polyhouse-signup.jpg" alt="Living room" fill className="rounded-2xl object-cover" />
                    </div>
                    <div className="relative">
                        <Image src="/polyhouse-signup.jpg" alt="Kitchen" fill className="rounded-2xl object-cover" />
                    </div>
                </div>

                {/* Main + sidebar */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-2xl border border-border-inputs p-6">
                            <p className="text-sm font-semibold">3 bedrooms · 2 bathrooms · 2 parking spaces</p>
                            <h2 className="mt-4 text-xl font-bold">A little more room for your college years.</h2>
                            <p className="mt-2 text-sm text-under-input">
                                A bright, single-story home in Anholm with a shared living room, sunny backyard
                                and room for a dining table. A bike-friendly route connects to campus and downtown.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Bubble_text variant="Message">In-unit laundry</Bubble_text>
                                <Bubble_text variant="Message">Private backyard</Bubble_text>
                                <Bubble_text variant="Message">Dishwasher</Bubble_text>
                                <Bubble_text variant="Message">Bike storage</Bubble_text>
                            </div>
                        </div>
                        {/* pricing + reviews sections go here */}
                    </div>

                    <aside>
                        <Listing_Summary />
                    </aside>
                </div>
            </div>
        </div>
    )
}
