import { logout } from "@smash/lib";
import { NextResponse } from "next/server";

export async function GET() {
  await logout();
  return new NextResponse("Logged out successfully!", { status: 200 });
}
