import { getSession } from "@smash/lib";
import axios from "axios";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { BalanceText, SignoutButton } from "../components";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/", RedirectType.replace);
  } else {
    const userEmail = session.user.email;
    return (
      <>
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center">
          <div className="text-2xl font-semibold">
            <div className="drop-shadow-[0_25px_25px_#fca5a5] font-bold text-white bg-red-300 text-5xl rounded-lg p-3 inline-flex h-24 w-24 justify-center items-center aspect-square flex-shrink-0 text-center">
              {session.user.first_name?.[0]}
            </div>
            <span className="font-bold text-orange-500 text-7xl ml-4">
              Smash
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
          <Link href="/home/bookings">
            <button className="text-xl underline-offset-4 underline text-black hover:text-red-700 hover:italic p-3">
              Bookings
            </button>
          </Link>
          <Link href="/home/courts">
            <button className="text-xl underline-offset-4 underline text-black hover:text-red-700 hover:italic p-3">
              Courts
            </button>
          </Link>
          <SignoutButton />
          </div>
        </div>
        <div className="flex flex-row justify-around">
          
          
          <BalanceText email={userEmail} />
        </div>
        {children}
      </>
    );
  }
}
