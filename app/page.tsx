import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-2 bg-poly-green-light min-h-screen">
      {/* Right Side of the Page */}
      <div className="grid grid-rows-3">
        <div>
          <h1 className=""> Your off-campus search, all in one place.</h1>
           <p> Built aorund student life</p>
        </div>

        <div>
          <p>Student-friendly homes, quarter-length subleases and the details you need before signing</p>
          <p> Pictures will go here </p>
        </div>

        <div>
          <ul>
            <li>Keep your shortlist together</li>
            <li> Connect with the right person</li>
            <li> Plan for your Move in </li>
          </ul>
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
          <p > Im here as a....</p>
        </div>
        <div className=" flex flex-row justify-evenly gap-10 ">
          <button type="button" aria-label="Student" className=" rounded-md p-1 w-full bg-poly-green-dark text-white active:bg-button-click"> Student </button>
          <button type="button" aria-label="Owner/Realtor" className=" rounded-md p-1 w-full bg-poly-green-dark text-white active:bg-button-click"> Owner/Realtor </button>
        </div>

        <div className=" flex flex-row  gap-5 ">
          <div className="flex flex-col justify-self-auto w-full gap-3">
            <label htmlFor="name">First Name</label>
            <input type="text" placeholder="Enter your name" className="border rounded-md p-2 bg-white  border-border-inputs"/>
          </div>
          <div className="flex flex-col justify-self-auto w-full gap-3 ">
            <label htmlFor="Last_Name">Last Name</label>
            <input type="text" placeholder="Enter your Last name" className="border rounded-md p-2  bg-white  border-border-inputs"/>
          </div>


        </div>
        <div className=" flex flex-col justify-start gap-3">
          <label htmlFor="Email_Address">Email Address</label>
            <input type="email" placeholder="Enter your Email Adress" className="border rounded-md p-2 bg-white  border-border-inputs"/>

        </div>
        <div className=" flex flex-col justify-start gap-3">
          <label htmlFor="Password">Password</label>
          <input type="password" placeholder="Enter your Password" className="border rounded-md p-2 bg-white  border-border-inputs"/>

        </div>
        <div className=" flex flex-col justify-start gap-3 ">
          <label htmlFor="Confirm_password ">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" className="border rounded-md p-2 bg-white  border-border-inputs"/>
          <p className="text-under-input text-sm">At least 8 characters with a number or symbol</p>
        </div>
       <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-green-800"
        />
        <span className="text-sm">
          Send me housing updates by email (Optional)
        </span>
      </div>
        <div className="flex flex-row justify-center mt-10">
            <button type="button" aria-label="Create Account" className=" rounded-md p-1 w-full  bg-poly-green-dark text-white active:bg-button-click"> Create Account</button>
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
