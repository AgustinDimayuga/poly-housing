import type { ReactNode} from "react";


type TextboxProps = {
  children: ReactNode;
  placeholder?: string;
  styling?: string;
  id?: string;
  type?:string;
};

const css = 'border rounded-md p-2 bg-white  border-border-inputs'

export default function Textbox({ children, id= "",placeholder = " ",type="", styling = css, ...props} :TextboxProps){
      return(
       <div className="flex flex-col justify-self-auto w-full gap-3 ">
            <label htmlFor={id} >{children}</label>
            <input id ={id} type={type} placeholder={placeholder} className={styling} {...props}/>
        </div>
    )
}
