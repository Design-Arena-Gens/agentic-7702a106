import { NextResponse } from "next/server";
import { getTrades } from "@/lib/state";

export async function GET() {
  return NextResponse.json({ trades: getTrades() });
}
