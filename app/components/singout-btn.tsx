"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  const signOut = async () => {
    await axios.get("/api/logout");
    router.replace("/");
  };
  return (
    <button
      onClick={signOut}
      className="w-fit h-fit py-2 bg-orange-700 text-white hover:bg-white hover:text-orange-700 shadow-2xl hover:shadow-orange-700 rounded-lg p-1 px-4"
    >
      Log Out
    </button>
  );
}
