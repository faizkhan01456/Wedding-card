import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ message: "Please provide your name." }, { status: 400 });
  }
  if (!["accept", "decline"].includes(body.attendance)) {
    return NextResponse.json({ message: "Please choose an attendance response." }, { status: 400 });
  }

  // This starter intentionally does not claim to persist guest data.
  // Connect a database/email provider here before using RSVP in production.
  return NextResponse.json({
    message: "RSVP endpoint is ready for integration, but storage is not configured yet."
  }, { status: 501 });
}