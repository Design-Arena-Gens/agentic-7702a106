import { NextResponse } from "next/server";
import { syncTrades } from "@/lib/replicator";
import { logError } from "@/lib/logger";

export async function POST() {
  try {
    const result = await syncTrades();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    logError("Sync endpoint failed", {
      error: error instanceof Error ? error.message : String(error)
    });
    return NextResponse.json(
      { success: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
