"use client";

import { BACKEND_DOMAIN, COURTS, LoadingState, NewBookingData } from "@smash/common";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PacmanLoader } from "react-spinners";

const generateDateArray = (): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = formatDate(date);
    dates.push(formattedDate);
  }

  return dates;
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function ShuttleForm({ email }: { email: string }) {
  const [court, setCourt] = useState<number>();

  const [startHour, setStartHour] = useState<number>();

  const [duration, setDuration] = useState<number>();

  const [availableHours, setAvailableHours] = useState<number[]>();

  const [balance, setBalance] = useState();

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

  const [date, setDate] = useState<string>();

  const router = useRouter();

  const data = useMemo<NewBookingData>(
    () => ({
      email: email,
      court: court,
      slotDate: date,
      startHour: startHour,
      duration: duration,
    }),
    [email, court, date, startHour, duration]
  );

  useEffect(() => {
    const fn = async () => {
      const balance = (
        await axios.get(`${BACKEND_DOMAIN}/api/balance/${email}`)
      ).data.data.balance;
      setBalance(balance);
    };
    fn();
  }, []);

  const availableDurations = useMemo<number[]>(() => {
    if (!availableHours || !startHour) return [];

    const sortedAvailableHours = availableHours.sort((a, b) => a - b);

    const startHourIndex = sortedAvailableHours.indexOf(startHour);

    let count = 1;
    let nextIndex = startHourIndex + 1;

    while (
      nextIndex < sortedAvailableHours.length &&
      sortedAvailableHours[nextIndex] ===
        sortedAvailableHours[nextIndex - 1] + 1
    ) {
      count++;
      nextIndex++;
    }

    const finalAvailableHours = Array.from(
      { length: count },
      (_, index) => index + 1
    );

    return finalAvailableHours;
  }, [availableHours, startHour]);

  const [datesArray] = useState(generateDateArray());

  const onSelectCourtEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourt(Number(event.target.value));
    setDate(undefined);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
    setStartHour(undefined);
  };

  const handleStartHourChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartHour(Number(event.target.value));
    setDuration(undefined);
  };

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDuration(Number(event.target.value));
  };

  useEffect(() => {
    const fn = async () => {
      if (!court || !date) return;
      setLoadingState(LoadingState.Loading);
      const availableHours = (
        await axios.get(
          `${BACKEND_DOMAIN}/api/available-hours/${court}/${date}`
        )
      ).data.data.availableHours;
      setAvailableHours(availableHours);
      setLoadingState(LoadingState.Loaded);
    };
    fn();
  }, [date, court]);

  const totalCharges = useMemo(() => duration && duration * 100, [duration]);

  const handleNewBooking = useCallback(async () => {
    console.log("data -", data);
    if (Object.values(data).some((v) => !v)) return;
    console.log("yo");
    await axios.post(`${BACKEND_DOMAIN}/api/new-booking`, data);
    router.replace("/home/bookings");
  }, [court, date, startHour, duration]);

  return (
    <div className="flex flex-col md:flex-row pt-2 md:pt-5 gap-5 text-lg flex-wrap">
      <div>
        <span className="font-semibold text-orange-700">Select Court:</span>
        <br />
        {COURTS.map((court) => (
          <label key={court.court_no}>
            <input
              type="radio"
              onChange={onSelectCourtEvent}
              name="court"
              value={court.court_no}
              className="mr-4 mt-4"
            />
            {`${court.name} - ${court.location}`}
            <br />
          </label>
        ))}
      </div>
      {court && (
        <div>
          <span className="font-semibold text-orange-700">Select Date:</span>
          <br />
          <select
            onChange={handleDateChange}
            value={date || ""}
            className="mt-4 bg-orange-700 text-white p-3 rounded-lg font-semibold"
          >
            <option disabled hidden />
            {datesArray.map((date, index) => (
              <option
                key={index}
                value={date}
                className="rounded-lg bg-orange-500 p-2 m-2"
              >
                {date}
              </option>
            ))}
          </select>
        </div>
      )}
      {date &&
        availableHours &&
        (loadingState === LoadingState.Loading ? (
          <PacmanLoader />
        ) : (
          <div>
            <span className="font-semibold text-orange-700">Select Time:</span>
            <br />
            <select
              onChange={handleStartHourChange}
              value={startHour || ""}
              className="mt-4 bg-orange-700 text-white p-3 rounded-lg font-semibold"
              name="hour"
            >
              <option disabled hidden />
              {availableHours.map((hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="rounded-lg bg-orange-500 p-2 m-2"
                >
                  {`${hour}:00`}
                </option>
              ))}
            </select>
          </div>
        ))}
      {date && availableHours && startHour && (
        <div>
          <span className="font-semibold text-orange-700">Select Duration:</span>
          <br />
          <select
            onChange={handleDurationChange}
            value={duration || ""}
            className="mt-4 bg-orange-700 text-white p-3 rounded-lg font-semibold"
            name="hour"
          >
            <option disabled hidden />
            {availableDurations.map((duration) => (
              <option
                key={duration}
                value={duration}
                className="rounded-lg bg-orange-500 p-2 m-2"
              >
                {`${duration} hours`}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="md:w-full" />
      <div className="flex flex-col gap-3">
      {duration && balance && totalCharges && (
        <>
          <div className="font-semibold text-orange-700">Total Balance: ₹ {balance}</div>
          <div
            className={clsx(
              "font-semibold text-red-700",
              totalCharges > balance && "text-red-700"
            )}
          >
            Total Charges: ₹ {totalCharges}
            {totalCharges > balance && (
              <div>You don't have enough balance.</div>
            )}
          </div>
        </>
      )}
      {totalCharges && balance && (
        <div>
          <button
            disabled={totalCharges > balance}
            className={clsx(
              "rounded-lg p-3 px-20",
              totalCharges > balance ?
                "bg-orange-300 hover:bg-orange-300 shadow-none text-white" : "bg-orange-700 text-white hover:bg-white hover:text-orange-700 shadow-2xl hover:shadow-orange-700"
            )}
            onClick={handleNewBooking}
          >
            Checkout
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
