import { ReactNode } from "react"

type BubbleVariant = "Message" | "Review"

type Bubble_text = {
    children:ReactNode
    variant:BubbleVariant
    rating?: number
    reviews?: number
}

const variantClasses: Record<BubbleVariant, string > = {

    Message: " inline-block text-poly-green-dark p-2 rounded-2xl font-bold bg-mini-labels text-sm ",
    Review : " inline-block text-poly-green-dark p-2 rounded-2xl font-bold bg-mini-labels text-sm "


}
export default function Bubble_text(
    {children, variant, rating=0,reviews=0}:Bubble_text){

    return(
        <div className=" ">
            {variant === "Review" ? (
                <p className={variantClasses[variant]}>
                    {rating} ★ {reviews} reviews
                </p>
            ) :  (
                <p className={variantClasses[variant]}>
                    {children}
                </p>
            )}
        </div>
    )


}
