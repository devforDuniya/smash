import { redirect, RedirectType } from "next/navigation";
import { getSession, login, logout } from "@smash/lib";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/home/courts", RedirectType.replace);
  }
  return (
    <section className="flex-1 flex flex-col md:flex-row md:p-5">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-orange-700 mb-10 text-6xl md:text-7xl font-semibold">
          Smash
        </div>
        <form
          action={async (formData) => {
            "use server";
            const isCorrect = await login(formData);
            if (isCorrect) {
              redirect("/home/bookings", RedirectType.replace);
            } else {
              redirect("/wrong", RedirectType.replace);
            }
          }}
          className="flex flex-col gap-2 text-xl w-full items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl w-2/3"
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl w-2/3"
          />
          <br />
          <button
            type="submit"
            className="bg-orange-700 text-white hover:bg-white hover:text-orange-700 shadow-2xl hover:shadow-orange-700 rounded-lg p-3 px-20"
          >
            Login
          </button>
        </form>
        <Link href="/signup">
          <button className="mt-5 bg-orange-700 text-white hover:bg-white hover:text-orange-700 shadow-2xl hover:shadow-black rounded-lg p-3 px-20">
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
}
