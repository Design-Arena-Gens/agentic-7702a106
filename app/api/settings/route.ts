import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/state";
import { z } from "zod";

export async function GET() {
  return NextResponse.json(getSettings());
}

const SettingsSchema = z.object({
  mirroringEnabled: z.boolean().optional()
});

export async function PATCH(req: Request) {
  const json = await req.json();
  const parsed = SettingsSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  updateSettings(parsed.data);

  return NextResponse.json(getSettings());
}
