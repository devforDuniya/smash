import { redirect, RedirectType } from "next/navigation";
import { getSession, signup } from "@smash/lib";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/home", RedirectType.replace);
  }
  return (
    <section className="flex-1 flex flex-row p-5">
      \      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-orange-700 mb-10 text-6xl md:text-7xl font-semibold">
          Smash
        </div>
        <form
          action={async (formData) => {
            "use server";
            await signup(formData);
            redirect("/", RedirectType.replace);
          }}
          className="flex flex-col gap-5 text-xl w-full items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl w-2/3"
          />
          <div className="flex flex-col gap-5 md:flex-row w-2/3 md:gap-4">
            <input
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl flex-1"
              minLength={5}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl flex-1"
            />
          </div>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="rounded-lg p-5 focus:border-orange-700 focus:ring-orange-700 text-xl w-2/3"
            minLength={8}
          />
          <button
            type="submit"
            className="bg-orange-700 text-white hover:bg-white hover:text-orange-700 shadow-2xl hover:shadow-orange-700 rounded-lg p-3 px-20"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
