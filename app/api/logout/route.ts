import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookie = await cookies();
    cookie.delete("sessionId");

    return NextResponse.json({ message: "logout successful" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message });
  }
}
