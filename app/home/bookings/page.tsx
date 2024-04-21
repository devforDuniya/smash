import * as React from "react";

import { getSession } from "@smash/lib";
import { Bookings } from "@smash/app/components";

export default async function UserBookings() {
  const session = await getSession();
  const userEmail = session?.user?.email || "";
  return <Bookings email={userEmail} />;
}
