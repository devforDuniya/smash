"use client";

import { BACKEND_DOMAIN } from "@smash/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

export default function BalanceText({ email }: { email: string }) {
  const [balance, setBalance] = useState();
  useEffect(() => {
    const fn = async () => {
      const balance = (
        await axios.get(`${BACKEND_DOMAIN}/api/balance/${email}`)
      ).data.data.balance;
      setBalance(balance);
    };
    fn();
  }, []);

  return (
    <div className="text-xl mt-5 text-red-700 font-bold p-3">
      Balance:{" "}
      <span className="text-black">
        ₹ {balance === 0 || balance ? balance : <SyncLoader />}
      </span>
    </div>
  );
}
