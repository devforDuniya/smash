import { getSession } from "@smash/lib";
import { redirect, RedirectType } from "next/navigation";
import { ShuttleForm } from "../components";

export default async function NewBooking() {
  const session = await getSession();
  if (!session) {
    redirect("/", RedirectType.replace);
  } else {
    return (
      <>
        <div className="text-2xl font-semibold">
          <span className="drop-shadow-[0_25px_25px_#fca5a5] font-bold text-orange-500 text-3xl">
            Let's Smash!
          </span>
        </div>
        <div className="text-2xl mt-3">Select court and timings:</div>
        <ShuttleForm email={session.user.email} />
      </>
    );
  }
}
