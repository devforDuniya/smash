"use client";

import { Booking, LoadingState } from "@smash/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function convertToHour(hourString: number) {
  const newHourString = `${hourString.toString().padStart(2, "0")}:00`;
  return newHourString;
}

export default function Bookings({ email }: { email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

  useEffect(() => {
    const fn = async () => {
      console.log("email", email);
      const bookings = (
        await axios.get(`http://localhost:3000/api/bookings/${email}`)
      ).data.data.bookings;
      console.log(bookings);
      setBookings(bookings);
      setLoadingState(LoadingState.Loaded);
    };
    setTimeout(() => {
      try {
        fn();
      } catch {
        setLoadingState(LoadingState.NotLoaded);
      }
    }, 1000);
  }, []);

  if (loadingState === LoadingState.Loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  }
  return (
    <>
      <div className="w-full overflow-x-scroll md:overflow-hidden">
        <table className="md:w-full">
          <thead className="md:w-full">
            <tr className="md:w-full md:flex md:flex-row gap-3">
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                ID
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Booked On
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Court No.
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Booked For
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Start Hour
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Hours
              </th>
              <th className="w-fit p-2 md:flex-1 border-4 border-purple-700 bg-purple-300 font-semibold">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="md:w-full">
            {bookings.map((booking) => (
              <tr
                key={`${booking.booking_dt}-${email}`}
                className="md:w-full md:flex md:flex-row gap-3 pt-2"
              >
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {booking.booking_id}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {new Date(booking.booking_dt).toLocaleString()}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {booking.court}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {booking.slot_date}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {convertToHour(booking.slot_hour)}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  {booking.hours}
                </td>
                <td className="w-fit p-2 text-center md:flex-1 border-2 border-black">
                  ₹ {booking.hours * 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
