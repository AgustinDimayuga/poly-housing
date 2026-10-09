import Image from "next/image";
import Button from "./components/button";
import Textbox from "./components/text";

export default function Home() {
  return (


      <div className="grid grid-cols-2 bg-poly-green-light min-h-screen pb-[10  %]">
        {/* Right Side of the Page */}
        <div className="grid grid-rows ml-15">

          <div className="flex flex-col gap-10 items-start mt-10">
            <p className=" inline-block text-poly-green-dark p-2 rounded-2xl bg-mini-labels text-sm"> Built around student life</p>
            <h1 className="text-4xl font-semibold font-inter text-signup-title-green"> Your off-campus search,<br/> all in one place.</h1>
          <p className="text-under-input">Student-friendly homes, quarter-length subleases and the details you <br/> need before signing</p>
          <Image src="/polyhouse-signup.jpg" width={600} height={100} alt="Picture of House" className="rounded-2xl"/>
          </div>

          <div className=" flex flex-col gap-1 mt-[5%]">
            <h2 className=" text-signup-title-green font-bold"> Keep your Shortlist together</h2>
            <h2 className=" text-under-input"> Save Homes and notes  for your roommaate group</h2>
            <h2 className=" text-signup-title-green font-bold"> Connect with the right person</h2>
            <h2 className=" text-under-input"> Reach owners,realtors and students directly</h2>
            <h2 className=" text-signup-title-green font-bold">Plan for your move-in</h2>
            <h2 className=" text-under-input"> Search by dates, not just immediate vacancies</h2>
          </div>
        </div>

        {/* rightside of the Login Page
        The structure of the pages is :
        Every div inside the huge div is grid-row (for better orgnaization)
        for the input of first name and last name inside of that corresponding div is a
        flex that separates first & last name input and another flex that
        makes the label and input stack on top of each other
        otherwise every dive is using flex-col so the content inside of it stack
        (There is probably a better way to use Flex instead of copying pasting)
        - For Inputs I erased the Id label FYI, will probably have to add it later when backend is created
        */}


        <div className="flex flex-col mr-20 mt-20 gap-5">
          <div>
            <h1 className="text-4xl font-inter font-bold "> Create your Account  </h1>
            <p className="mt-5 text-under-input hover:underline"> Already Have an Account? </p>

          </div>

          <div>
            <p className="font-inter"> Im here as a....</p>
          </div>
          <div className=" flex flex-row justify-evenly gap-10 ">
            <Button variant="primary" aria-label="Student" className="w-full">Student</Button>
            <Button variant="white" aria-label="Owner/Realtor" className="w-full" >Owner/Realtor</Button>
          </div>

          <div className=" flex flex-row  gap-5 ">

            <Textbox placeholder="Enter your First Name"> First Name </Textbox>

            <Textbox placeholder=" Enter your last Name"> Last Name </Textbox>


          </div>


          <Textbox placeholder="Please Enter Your Email"> Email</Textbox>


          <Textbox placeholder="Please Enter Your Password" type="password"> Password </Textbox>

          <div className=" flex flex-col justify-start gap-3 ">
            {/* <label htmlFor="Confirm_password ">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" className="border rounded-md p-2 bg-white  border-border-inputs"/> */}
              <Textbox placeholder="Confirm Password" type="Password"> Confirm Password</Textbox>
            <p className="text-under-input text-sm">At least 8 characters with a number or symbol</p>
          </div>

        <div className="flex flex-row items-center gap-2">
         <label>
          <input type="checkbox" className="h-4 w-4 accent-green-800"/>
          <span className="text-sm  "> Send me housing updates by email (Optional)</span>
          </label>
        </div>

          <div className="justify-center mt-10">
              <Button variant="primary" aria-label="Create Account" className="w-full"> Create Account</Button>
          </div>


        </div>




  </div>

  );
}

{/* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div> */}
