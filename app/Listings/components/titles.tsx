import type { ReactNode} from "react";

type TitleProps =  {
    children:ReactNode
    address : string;

}

export default function Title({children, address} : TitleProps){

return (
    <div>

        <h1 className="text-3xl font-bold font-inter text-signup-title-green">{children}</h1>
        <p className=" text-under-input mt-3">{address}</p>

    </div>
)


}
