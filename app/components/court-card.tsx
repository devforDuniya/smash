"use client";

import { Court } from "@smash/common";
import Image from "next/image";
import Link from "next/link";

const CourtCard = ({ court }: { court: Court }) => {
  return (
    <div
      className={
        "group h-fit border-2 border-purple-700 hover:bg-purple-700 p-3 rounded-lg hover:shadow-gray-500 flex flex-col md:flex-row md:justify-between gap-3 m-2 items-center"
      }
    >
      <div className="from-purple-700 via-purple-300 to-purple-500 text-transparent bg-gradient-to-r bg-clip-text h-full group-hover:text-white flex flex-col text-[50px] md:text-[100px] font-extrabold text-center">
        {court.name}
      </div>
        <div className="text text-purple-700 group-hover:text-white font-semibold rounded-lg overflow-hidden">
          <Image
            src={court.img_file}
            alt={`Badminton Court: ${court.name}`}
            className="h-40 w-60"
          />
        </div>
        <div className="font-bold group-hover:text-white">
          <span className="font-normal text-gray-700 group-hover:text-gray-300">
            Location: <span className="font-semibold">{court.location}</span>
          </span>
        </div>
        <div className="flex flex-row justify-center">
          <Link
            href="/new-booking"
            className={`bg-purple-700 flex-1 text-center group-hover:bg-white text-lg px-5 py-2 rounded-lg hover:text-purple-700 shadow-md font-semibold hover:shadow-white`}
          >
            New Booking
          </Link>
      </div>
    </div>
  );
};

export default CourtCard;
